// @ts-nocheck

import { EIMZOClient as client } from './e-imzo-client';
import { notificationSlice } from '@/common/notification';
import { store } from '@/store';

const CAPIWS = window.CAPIWS;

/**
 * @typedef Cert
 * @property {string} disk
 * @property {string} path
 * @property {string} name
 * @property {string} alias
 * @property {string} serialNumber
 * @property {string} validFrom
 * @property {string} validTo
 * @property {string} CN
 * @property {string} TIN
 * @property {string} UID
 * @property {string} O
 * @property {string} T
 * @property {string} type
 */

/**
 * @typedef SignPkcs7Result
 * @property {string} pkcs7_64
 * @property {string} signature_hex
 * @property {string} signer_serial_number
 */

/**
 * @typedef LoadKeyResult
 * @property {string} id
 * @property {Cert} cert
 **/

export default class EIMZO {
  /**
   * @type {?Cert}
   */
  _loadedKey = null;

  get loadedKey() {
    return this._loadedKey;
  }

  set loadedKey(value) {
    this._loadedKey = value;
  }

  apiKeys = [
    'localhost',
    '96D0C1491615C82B9A54D9989779DF825B690748224C2B04F500F370D51827CE2644D8D4A82C18184D73AB8530BB8ED537269603F61DB0D03D2104ABF789970B',
    '127.0.0.1',
    'A7BCFA5D490B351BE0754130DF03A068F855DB4333D43921125B9CF2670EF6A40370C646B90401955E1F7BC9CDBF59CE0B2C5467D820BE189C845D0B79CFC96F',
    'fsp.agro.uz',
    'FB62BC40562A5E8FCA8297EBE58958B898CE5288EE67BCBA6AE2D508C3FF41B7F23720F17C6B30ADD388E2DC9C9EA4AE4114ACA615FFF9B8D2C9DEA218943944',
  ];

  /**
   * @return {Promise<{major: Number, minor: Number}>}
   */
  async checkVersion() {
    return await new Promise((resolve, reject) => {
      client.checkVersion(
        function (major, minor) {
          resolve({ major, minor });
        },
        function (error, message) {
          reject(error, message);
        },
      );
    });
  }

  async installApiKeys() {
    return await new Promise((resolve, reject) => {
      client.installApiKeys(resolve, reject);
    });
  }

  /**
   * @return {Promise<Cert[]>}
   */
  async listAllUserKeys() {
    return await new Promise((resolve, reject) => {
      client.listAllUserKeys(
        function (cert, index) {
          return 'cert-' + cert.serialNumber + '-' + index;
        },
        function (index, cert) {
          return cert;
        },
        function (items, firstId) {
          resolve(items, firstId);
        },
        function (error, reason) {
          reject(error, reason);
        },
      );
    });
  }

  /**
   * @param {Cert} cert
   * @return {Promise<LoadKeyResult>}
   */
  async loadKey(cert) {
    return await new Promise((resolve, reject) => {
      client.loadKey(
        cert,
        (id) => {
          this._loadedKey = cert;
          resolve({ cert, id });
        },
        (err, reason) => {
          store.dispatch(
            notificationSlice.actions.open({ message: err || reason }),
          );
          reject(err || reason);
        },
      );
    });
  }

  /**
   * @param {string} loadKeyId
   * @return {Promise<string[]>}
   */
  async getCertificateChain(loadKeyId) {
    return await new Promise((resolve, reject) => {
      CAPIWS.callFunction(
        {
          plugin: 'x509',
          name: 'get_certificate_chain',
          arguments: [loadKeyId],
        },
        (event, data) => {
          if (data.success) {
            resolve(data.certificates);
          } else {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('Failed');
          }
        },
        reject,
      );
    });
  }

  /**
   * @param {string} loadKeyId
   * @return {Promise<?string>}
   */
  async getMainCertificate(loadKeyId) {
    const result = await this.getCertificateChain(loadKeyId);

    if (Array.isArray(result) && result.length > 0) {
      return result[0];
    }
    return null;
  }

  /**
   * @param {string} cert
   * @return {Promise<void>}
   */
  async getCertInfo(cert) {
    await new Promise((resolve, reject) => {
      CAPIWS.callFunction(
        { name: 'get_certificate_info', arguments: [cert] },
        (event, data) => {
          if (data.success) {
            resolve(data.certificate_info);
          } else {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('Failed');
          }
        },
        reject,
      );
    });
  }

  /**
   * @param {Cert} cert
   * @param {string} content
   * @return {Promise<SignPkcs7Result>}
   */
  async signPkcs7(cert, content) {
    const loadKeyResult = await this.loadKey(cert);

    return await new Promise((resolve, reject) => {
      CAPIWS.callFunction(
        {
          name: 'create_pkcs7',
          plugin: 'pkcs7',
          arguments: [window.Base64.encode(content), loadKeyResult.id, 'no'],
        },
        (event, data) => {
          if (data.success) {
            resolve(data);
          } else {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('Failed');
          }
        },
        reject,
      );
    });
  }

  /**
   * @param {string} id of loaded cert
   * @param {string} content
   * @param {?Function} timestamper - function to get timestamp data from server
   * @return {Promise<SignPkcs7Result>}
   */
  async createPkcs7(id, content, timestamper, success, fail) {
    return await new Promise((resolve, reject) => {
      client.createPkcs7(id, content, timestamper, success, fail);
    });
  }

  /**
   * @param {string} signature
   *
   * @return {Promise<string>}
   */
  async getTimestampToken(signature) {
    return await new Promise((resolve, reject) => {
      CAPIWS.callFunction(
        {
          name: 'get_timestamp_token_request_for_signature',
          arguments: [signature],
        },
        function (event, data) {
          if (data.success) {
            resolve(data.timestamp_request_64);
          } else {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('Failed');
          }
        },
        reject,
      );
    });
  }

  /**
   * @param {string} domain
   * @param {string} key
   */
  addApiKey(domain, key) {
    if (!this.apiKeys.includes(domain)) {
      this.apiKeys.push(domain, key);
    }
  }

  async install() {
    await this.checkVersion();

    client.API_KEYS = this.apiKeys;

    await this.installApiKeys();
  }
}

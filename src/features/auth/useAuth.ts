import { HttpApi } from '@/common/http';
import { ENDPOINT_CERT } from '@/common/constants';
import { ICertificate } from '@/features/eri/models';
import EIMZO from '@/features/eri/utils/Eimzo.ts';

const httpApi = new HttpApi();

export const useAuth = () => {
  const EIMZOClient = new EIMZO();

  const authCert = async (data: any) => {
    await httpApi.post(ENDPOINT_CERT, data).then((response) => {
      location.replace('/');
    });
  };

  const selectKey = async (key: ICertificate): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      try {
        let resultKey: any;
        resultKey = (await EIMZOClient.loadKey(key)) as {
          cert: ICertificate;
          id: string | number;
        };

        await EIMZOClient.createPkcs7(
          resultKey.id,
          'key',
          null,
          (sign: any) => {
            authCert({ sign }).catch((err) => {
              reject(err);
            });
          },
          null,
        );
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    selectKey,
  };
};

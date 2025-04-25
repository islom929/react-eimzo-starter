import * as yup from 'yup';
import { getValidationMessages } from '@/common/constants/validation-messages.ts';

const messages = getValidationMessages();

export const testSchema = yup.object({
  data: yup.string().required(messages.required),
});

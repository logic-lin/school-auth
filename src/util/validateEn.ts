import {
  Validate as validateNative,
  ValidateOptions,
} from '@midwayjs/validate';
const Validate = function (options?: ValidateOptions) {
  return validateNative(
    Object.assign(
      {
        locale: 'zn_US',
      },
      options || {}
    )
  );
};
export default Validate;

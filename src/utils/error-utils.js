export class ErrorUtils {
    static extractErrorMessagesObject = errorObject => {
      let message
      if ('message' in errorObject) {
        message = errorObject.message
      }
  
      if (typeof message === 'string') {
        return { default: message }
      }
      return Object.entries(errorObject).reduce((result, [key, value]) => {
        result[key] = value[0];
        return result;
      }, {});
    }
  
    static parseInnerKeys = (stringKeys , value) => {
      const arrayOfKeys = stringKeys.split('.').reverse()
      return arrayOfKeys.reduce((value, key) => ({ [key]: value }), value)
    }
  }
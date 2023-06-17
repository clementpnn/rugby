const useCreatePassword = (length = 12) => {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let returnValue = '';
        for (let index = 0, n = charset.length; index < length; ++index) {
            returnValue += charset.charAt(Math.floor(Math.random() * n));
        }
        return returnValue;
    }

export default useCreatePassword
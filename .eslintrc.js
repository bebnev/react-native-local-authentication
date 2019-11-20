module.exports = {
    parser:  '@typescript-eslint/parser',
    extends: [
        "@react-native-community"
        //"plugin:@typescript-eslint/recommended",
    ],
    parserOptions:  {
        ecmaVersion: 2018,  // Allows for the parsing of modern ECMAScript features
        sourceType: "module",  // Allows for the use of imports
    },
    rules: {
        "object-curly-spacing": ["error", "always"]
    }
};
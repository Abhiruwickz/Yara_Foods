module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      [
        "module-resolver",
        {
          root: ["./"], // This should point to your project root
          alias: {
            "@components": "./components", // Add alias for components
            "@constants": "./constants",   // Add alias for constants
            // You can add more aliases as needed
          },
        },
      ],
    ],
  };
};

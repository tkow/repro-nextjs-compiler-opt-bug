/** @type {import('next').NextConfig} */

const noopPlugin = require("./noop-plugin");

module.exports = noopPlugin()({});

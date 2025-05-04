/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const upstreamTransformer = require('react-native-svg-transformer');

module.exports.transform = function ({ src, filename, options }) {
  if (filename.endsWith('.svg')) {
    // 🎯 remove all `fill="..."`, `stroke`, and all HTML comments (<!-- ... -->)
    const newSrc = src
      .replace(/fill="[^"]*"/g, '') // Xóa fill trong dấu ngoặc kép
      .replace(/stroke="[^"]*"/g, '') // Xóa stroke trong dấu ngoặc kép
      .replace(/fill: ".*?"/g, '') // Xóa fill trong CSS với dấu ngoặc kép
      .replace(/stroke: ".*?"/g, '') // Xóa stroke trong CSS với dấu ngoặc kép
      .replace(/fill:'.*?'/g, '') // Xóa fill trong CSS với dấu nháy đơn
      .replace(/stroke:'.*?'/g, '') // Xóa stroke trong CSS với dấu nháy đơn
      .replace(/<!--[\s\S]*?-->/g, ''); // Xóa tất cả comment HTML từ <!-- đến -->

    return upstreamTransformer.transform({
      src: newSrc,
      filename,
      options,
    });
  }

  return upstreamTransformer.transform({ src, filename, options });
};

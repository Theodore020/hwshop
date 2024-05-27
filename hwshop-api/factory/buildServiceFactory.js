const fs = require("fs");
const path = require("path");
const buildServiceFactory = () => {
    let arr = fs.readdirSync(path.join(__dirname, "../services"));
    let contentStr = arr.map(item => {
        return `static create${item.replace(".js", "")}(){ 
                    return Reflect.construct(require("../services/${item}"), []);
                }`
    }).join("\n");


    let str = `
        class ServiceFactory {
            ${contentStr}
        }

        module.exports = ServiceFactory;
    `;
    fs.writeFileSync(path.join(__dirname, "./ServiceFactory.js"), str, "utf-8");
}
module.exports = buildServiceFactory;
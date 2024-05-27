
        class ServiceFactory {
            static createAreaService(){ 
                    return Reflect.construct(require("../services/AreaService.js"), []);
                }
static createBaseService(){ 
                    return Reflect.construct(require("../services/BaseService.js"), []);
                }
static createGoodsInfoService(){ 
                    return Reflect.construct(require("../services/GoodsInfoService.js"), []);
                }
static createListInfoService(){ 
                    return Reflect.construct(require("../services/ListInfoService.js"), []);
                }
        }

        module.exports = ServiceFactory;
    
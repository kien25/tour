"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ability_1 = require("@casl/ability");
function defineAbilityFor(customers) {
    return (0, ability_1.defineAbility)((can, cannot) => {
        // console.log("in ra can!????", customers.id);
        can("read", "Comment");
        if (customers.id) {
            can("update", "Comment", { idcus: customers.id });
        }
    });
}
exports.default = defineAbilityFor;

import { defineAbility } from "@casl/ability";
export default function defineAbilityFor(customers: any) {
  return defineAbility((can: any, cannot: any) => {
    // console.log("in ra can!????", customers.id);

    can("read", "Comment");
    if (customers.id) {
      can("update", "Comment", { idcus: customers.id });
    }
  });
}

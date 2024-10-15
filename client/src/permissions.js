import { AbilityBuilder, Ability } from '@casl/ability';

export const defineAbilitiesFor = (role) => {

  const { can, cannot, build } = new AbilityBuilder(Ability);

  switch (role) {
    case 'Super Admin':
      can('create', 'Admins'); 
      can('read', 'Earnings'); 
      can('update', 'Profile'); 
      break;
    case 'Restaurant Register':
      can('create', 'User');
      can('create', 'Role');
      can('update', 'Profile');
      can('read', 'Reports');
      break;
    case 'Kitchen Manager':
      can('read', 'Menu');
      can('create', 'Menu');
      can('update', 'OrderStatus');
      can('update', 'Profile');
      break;
    case 'Branch Manager':
      can('read', 'Menu');
      can('read', 'Orders');
      can('update', 'Profile');
      break;
    case 'Cashier':
      can('read', 'Orders');
      break;
    case 'Customer':
      can('create', 'Order');
      can('read', 'Order');
      break;
    default:
      cannot('manage', 'all'); 
      break;
  }

  return build();
};

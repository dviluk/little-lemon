declare module "*.png";

type CurrentUser = {
  name: string;
  email: string;
  profile_picture?: string;
  last_name?: string;
  phone_number?: string;
  check_order_statuses?: boolean;
  check_password_changes?: boolean;
  check_special_offers?: boolean;
  check_newsletter?: boolean;
};

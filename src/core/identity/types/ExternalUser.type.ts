export type ExternalUser = {
  authentication: {
    serviceName: string;
    serviceKey: string;
  };
  familyName: string;
  givenName: string;
  emailAddress?: string;
  profilePicture?: string;
  claims?: any;
};

export const layoutConstant = {
  topbarHeight: 40,
  headerHeight: 80,
  mobileNavHeight: 64,
  containerWidth: 1200,
  mobileHeaderHeight: 64,
  grocerySidenavWidth: 280,
};

export const fileTypes = {
  PROFILE_PICTURE: "PROFILE_PICTURE",
};
//
export const getFilePath = ({ uuid, extension, userId }: any, type: string) => {
  if (type === fileTypes.PROFILE_PICTURE) {
    return `users/${userId}/profile-picture/${uuid}.${extension}`;
  }
};

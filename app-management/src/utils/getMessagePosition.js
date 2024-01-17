const getMessagePosition = (author, userUid) => {
    if (author === userUid) {
      return "ml-auto mb-5 bg-primary/90";
    } else {
      return "mr-auto mb-5 bg-foreground/90";
    }
  };

  export default getMessagePosition;
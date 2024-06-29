interface RegisterUserRequestType {
  username: string,
  email: string,
  password: string
}

interface LoginUserRequestType {
  username?: string,
  email?: string,
  password: string
}

export { LoginUserRequestType, RegisterUserRequestType };

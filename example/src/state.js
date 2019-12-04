export const biometryInitialState = {isSupported: undefined, isAvailable: undefined, status: undefined};

export function biometryReducer(state, action) {
  switch (action.type) {
    case 'set.supported':
      return {...state, isSupported: action.payload};
    case 'set.available':
      return {...state, isAvailable: action.payload};
    case 'set.status':
      return {...state, status: action.payload}
    default:
      throw new Error();
  }
}

export const authorizationInitialState = {
    loading: false,
    response: null,
    error: null,
}

export function authorizationReducer(state, action) {
    switch (action.type) {
        case 'auth.request':
            return {...authorizationInitialState, loading: true};
        case 'auth.finish':
            return {...state, loading: false, response: action.payload};
        case 'auth.error':
            return {...authorizationInitialState, error: action.payload};
        default:
            throw new Error();
    }
}
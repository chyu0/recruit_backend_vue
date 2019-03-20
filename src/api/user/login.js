import {post, get} from '@/libs/request';

export const login = ({ userName, password, authCode }) => {
  let data = {
    "userName" : userName,
    "password" : password,
    "authCode" : authCode
  }

  return post("login.do", data)
}

export const register = ({ userName, password, resetPassword, authCode }) => {
  let data = {
    "userName" : userName,
    "password" : password,
    "resetPassword" : resetPassword,
    "authCode" : authCode
  }
  return post("register.do", data)
}


export const logout = () => {
  return post("logout.do")
}

export const getUnreadCount = () => {
}

export const getMessage = () => {

}

export const getContentByMsgId = msg_id => {

}

export const hasRead = msg_id => {
}

export const removeReaded = msg_id => {
}

export const restoreTrash = msg_id => {
}

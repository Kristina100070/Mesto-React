class ApiTemplate {
    constructor({baseUrl, headers}) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }
    makeFetch(url, method='GET', body=undefined) {
        if (body) {
            body = JSON.stringify(body);
        }
        return fetch(`${this.baseUrl}/${url}`, {
            method,
            headers: this.headers,
            body
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
            .catch((err) => {
                throw err
            });
    }
    getInitialCards() {
        return this.makeFetch(`cards`);     
    }

    getUserInfo() {
        return this.makeFetch(`users/me`)   
    }
    updateProfile(userName, userJob) {
        return this.makeFetch(`users/me`, 'PATCH', {name: userName, about: userJob})
    }
    setCard(name, link) {
        return this.makeFetch(`cards`, 'POST', {name: name, link: link})  
    } 
    changeLikeCardStatus(_id, state) {
        if(state) {
            return this.makeFetch(`cards/like/${_id}`, 'PUT')
        }
        return this.makeFetch(`cards/like/${_id}`, 'DELETE')
    }
    deleteCard(_id) {
        return this.makeFetch(`cards/${_id}`, 'DELETE')
    }
    updateAvatar(link) {
        return this.makeFetch(`users/me/avatar`, 'PATCH', {avatar: link})
    }
}
export const Api = new ApiTemplate({
    baseUrl: 'https://nomoreparties.co/cohort8',
    headers: {
      authorization: 'c3ab1d6f-f7de-4703-a8ca-26881c8253c8',
      'Content-Type': 'application/json',
    },
    mode: 'no-cors',
    });

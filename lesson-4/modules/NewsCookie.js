/**
 * Class for working with cookies in News service.
 */
class NewsCookie {

    constructor() {
        this.cookieName = 'news';
    }

    /**
     * Set cookie for news service.
     *
     * @param queryParams
     * @param response
     */
    setCookie(queryParams, response) {
        let cookieValue = {
            'source': queryParams.source,
            'category': queryParams.category,
            'quantity': queryParams.quantity,
        };

        response.cookie(this.cookieName, JSON.stringify(cookieValue), {expires: new Date(Date.now() + 900000)});
    }

    /**
     * Get cookie for news service.
     *
     * @param request
     * @return {null}
     */
    getCookie(request) {
        if (request.cookies[this.cookieName]) {
            return JSON.parse(request.cookies[this.cookieName]);
        } else {
            return null;
        }
    }
}

module.exports = NewsCookie;
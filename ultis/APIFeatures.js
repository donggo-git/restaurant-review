class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        //1)filtering
        const queryObj = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);
        //2) advance filter
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)

        this.query = this.query.find(JSON.parse(queryStr))

        return this
    }
    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }
        else this.query = this.query

        return this;
    }
    pagination() {
        const page = this.queryString.page * 1 || 1
        const limit = 5
        const skip = (page - 1) * limit

        this.query = this.query.skip(skip).limit(limit)

        return this
    }
}

module.exports = APIFeatures
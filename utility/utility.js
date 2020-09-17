class QueryHelper{
    constructor(initialfindp, queryObj){
        this.query = initialfindp;
        this.queryObj = queryObj;
    }
    filter(){
        let myQuery = { ...this.queryObj };
    let toExcludeFields = ["sort", "select","limit", "page"];
    for(let i=0;i<toExcludeFields.length;i++){
      delete myQuery[toExcludeFields[i]];
    }
    this.query = planModel.find(myQuery);
    return this;
    }
    sort(){
        if(this.queryObj.sort){
            let sortString = this.queryObj.sort.split("%").join(" ");
            this.query = this.query.sort(sortString);
    }
    return this;
    }
    select(){
        if(this.queryObj.select){
            let selectString = this.queryObj.select.split("%").join(" ");
            this.query = this.query.select(selectString);
          }
          return this;
    }
    paginate(){
        let pageNo = Number(this.queryObj.page) || 1;
        let limit = Number(this.queryObj.limit) || 4;
        const toSkip = limit*(pageNo-1);
        this.query = this.query.skip(toSkip).limit(limit);
        return this;
    }
}
module.exports = QueryHelper;
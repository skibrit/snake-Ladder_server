module.exports = {
    range(low,high){
        return Math.random() * (high - low) + low;
    },
    random(high){
        return Math.floor(Math.random() * (high));
    }
};
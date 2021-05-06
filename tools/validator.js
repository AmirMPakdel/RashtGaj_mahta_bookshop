const consts = require('../utils/consts');
const config = require('../config/config');

function hasCode(req, res, params) {

    if (!params.code || params.code <=0 || params.code === "") {
        res.status(consts.BAD_REQ_CODE).json({error: consts.INCORRECT_PARAMS});
        return true;
    }
    return false;
}

function validateSpendCredit(req, res, params) {

    if (!params.code || !params.useFrom || !params.price) {
        res.status(consts.BAD_REQ_CODE)
            .json({
                error: consts.INCORRECT_PARAMS
            });

        return true;
    }

    return false;
}

function addStudent(req, res){

    let {firstName, lastName, grade, field, school, inviterCode, phone, home} = req.body;

    if(firstName === undefined || firstName === "" || firstName.length > 100){

        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_FIRSTNAME});
        return true;
    }

    if(lastName === undefined || lastName === "" || lastName.length > 100){

        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_LASTNAME});
        return true;
    }

    if (grade === "هفتم" || grade ===  "هشتم" || grade === "نهم") {

        if (field !== "") {
            res.status(consts.BAD_REQ_CODE).json({error:consts.FIELD_ISSUE});
            return true;
        }

    } else {

        if(field === undefined || field === ""){

            res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_FIELD});
            return true;
        }
    }

    if(grade === undefined || grade === ""){
        
        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_FIELD});
        return true;
    }



    if(school === undefined || school === "" || school.length > 100){
        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_SCHOOL});
        return true;
    }

    if(home !== undefined && home !== "" && home.length !== 11){ // just checking home number length
        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_HOME});
        return true;
    }

    if(phone === undefined || phone === "" || phone === 0 || phone.length !== 11){
        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_PHONE});
        return true;
    }
}

function editStudent(req, res){

    let {firstName, lastName, grade, field, school, inviterCode, phone, home} = req.body;

    if(firstName === undefined || firstName === "" || firstName.length > 100){

        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_FIRSTNAME});
        return true;
    }

    if(lastName === undefined || lastName === "" || lastName.length > 100){

        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_LASTNAME});
        return true;
    }

    if(grade === undefined || grade === ""){

        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_GRADE});
        return true;
    }

    if(field === undefined || field === ""){

        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_FIELD});
        return true;
    }

    if(school === undefined || school === "" || school.length > 100){
        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_SCHOOL});
        return true;
    }

    if(home !== undefined && home !== "" && home.length !== 11){ // just checking home number length
        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_HOME});
        return true;
    }

    if(phone === undefined || phone === "" || phone === 0 || phone.length !== 11){
        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_PHONE});
        return true;
    }
}

function commitGift(req, res) {

    let {price, info, gift, code} = req.body;

    if(code === undefined || code === "" || code === 0){
        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_MAHTA_ID});
        return true;
    }

    if(price === undefined && price === "" && price === 0){ // just checking home number length
        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_HOME});
        return true;
    }

    if(info === undefined || info === ""){
        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_INFO});
        return true;
    }

    return false;
}

function groupCommit(req, res) {

    let {start, number, gift} = req.body;

    if(start === undefined || start === "" || start === 0){

        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_START});
        return true;
    }

    if(number === undefined || number === "" || number === 0){

        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_NUMBER});
        return true;
    }

    if(gift === undefined){

        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_GIFT});
        return true;
    }

}

function spendCredit(req, res) {

    let {code, price} = req.body;

    if(code === undefined || code === "" || code === 0){

        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_MAHTA_ID});
        return true;
    }

    if(price === undefined || price === "" || price === 0){

        res.status(consts.BAD_REQ_CODE).json({error:consts.INCORRECT_PRICE});
        return true;
    }

    return false;

}


module.exports = {hasCode, validateSpendCredit, addStudent, groupCommit, commitGift, spendCredit, editStudent};


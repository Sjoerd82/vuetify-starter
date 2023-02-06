import _ from 'lodash'

export default {


    // https://stackoverflow.com/questions/23247859/better-way-to-sum-a-property-value-in-an-array
    //sumArray(items,prop) {
    //    if (items == null) {
    //        return 0;
    //    }
    //    return items.reduce(function (a, b) {
    //        return b[prop] == null ? a : a + b[prop];
    //    }, 0);
    //},

/*
    sourceDropdown(data, key_name, key_value) { //, key_group) {
        var group = {lead:[], group:{}};
        var source_id = null;
        var source_id_prev = null
        var source_name = null;
        for (var ix=0, len=data.length; ix<len; ++ix) {
            
            source_id = data[ix].source_id
            source_name = data[ix].source_name
            if (source_id != source_id_prev) {
                group.group[source_name] = []
            }

            group.group[source_name].push( {text:data[ix][key_name], value:data[ix][key_value]} )
            source_id_prev = source_id;
        }
        return group
    },
    */

    reverseString(s) {
        if (s === "") {
            return ""
        } else {
            return this.reverseString(s.substr(1)) + s.charAt(0)
        }
    },

    // 5-position string; a-zA-Z0-9
    shortUid() {
        const result = Math.random().toString(36).substring(2,7) //Base36, 5 long; first 2 positions are "0."
        return result
    },
    /*
     * Create a 16 digit string (remains within js max safe integer)
     *
     * Postitions  1-13 are a Unix epoch in miliseconds (1000th of second)
     * Postition  14-16 is either a counter or a random number between 0 and 999
     * 
     */
    createUid(counter=null) {
        let p1 = _.now() // ms
        let p3
        if (counter!=null && _.inRange(counter,10)) {
            p3 = _.padStart(counter,3,'0')
        } else {
            p3 = _.padStart(_.random(0,999),3,'0')
        }
        
        console.log(`${p1}|${p3}`)
        console.log(Number.MAX_SAFE_INTEGER)
        //console.log(parseInt(`${p1}${p3}`))
        //console.log(parseFloat(`${p1}${p3}`))
        //console.log(BigInt(`${p1}${p3}`))
        return parseInt(`${p1}${p3}`)
    },

    // This returns the uid from createUid as a 10-character Base36 string.
    // Base36 is a binary-to-text encoding scheme that represents binary data in an ASCII string format by translating it into a radix-36 representation. The choice of 36 is convenient in that the digits can be represented using the Arabic numerals 0–9 and the Latin letters A–Z
    createUidBase36() {
        return this.createUid().toString(36)
        //const maxint=9007199254740991 <-- Number.MAX_SAFE_INTEGER
        //return maxint.toString(36) // 11 characters
    },
    
    // Return a non-sequential 10-character string based on current time in miliseconds, and padded with random characters.
    // The string always starts with a character and is always 10 chars long.
    msAsBase36() {
        let p0 = _.random(10,35).toString(36) // a-z
        let p1 = _.now().toString() // ms
        let p3 = _.random(36,1295).toString(36) // 2 random base36 characters.
        //let p1 = "1675175048239" // 3b1erwshd 9 long
        //  anything in between is either 8 or 9 characters long (maybe 7?)
        //let p1 = "9999999999999" // 3jlxpt2pr 9 long
        let rev = parseInt(this.reverseString(p1))
        let res = _.padEnd(p0 + rev.toString(36), 10, p3)
        //console.log(p0,p1,rev, rev.toString(36),p3,res)
        return res
    },

    /*
     * Create a 18 digit string
     *
     * Postitions  1-10 are a Unix epoch in seconds
     * Postition     11 is either a counter or a 100th of a second
     * Postitions 12-18 is a random number between 0 and 9,999,999
     * 
     * VUE CURRENTLY DOES NOT SUPPORT BIGINT... using a Bigint anywhere* (could not track down where it breaks)
     * causes an JSON stringify error.
     * 
     * WORKAROUND, simply return an unsafe integer. The last digit seems to get lost, but
     * that's probably still random enough at this point...... #TODO-REVISIT-FUTURE
     * 
     */
    createUid__OLD(counter=null) {
        let nowMs = _.now()
        // if no counter is given, add 100th of the timestamp (divide by 100, instead of 1000)

        if (counter!=null && _.inRange(counter,10)) {
            var p1 = Math.trunc( nowMs/1000 ).toString() + counter.toString()
        } else {
            var p1 = Math.trunc( nowMs/100 )
        }
        
        var p3 = _.padStart(_.random(0,9999999),7,'0')
        console.log(`${p1}|${p3}`)
        console.log(Number.MAX_SAFE_INTEGER)
        console.log(parseInt(`${p1}${p3}`))
        console.log(parseFloat(`${p1}${p3}`))
        console.log(BigInt(`${p1}${p3}`))
        //return BigInt(`${p1}${p3}`)
        //return `${p1}${p3}`
        return parseInt(`${p1}${p3}`)
    },

    async createUids(n=1) {

        if (n < 1) {
            return []
        }

        const timer = ms => new Promise(res => setTimeout(res, ms))
       
        let arrUids = []
        for (var i=0; i<n; i++) {
            console.log(i%10, )
            arrUids.push(funcs.createUid(i%10))
            if (i%10 == 9) {
                console.log('sleep 1s')
                // #TODO-FUTURE-IMPROVEMENT
                // the wait time could be reduced if we check how many ms. are left until the next second...
                await timer(1000)
            }
        }
        return arrUids
    },

    

    proficiencyBonus(character_level, adjustment) {
        return Math.round( ((character_level-1)/4)+0.5 )+1 + (adjustment||0)
    },
    abilityBonus(ability) {
        return Math.floor((ability/2))-5
    },

    signedValue(value) {
        if (parseInt(value) >= 0) {
            return "+" + value
        } else {
            return value
        }
    },
    wrapTag(value,tag) {
        const allowed = ["p","li"]
        if (!allowed.includes(tag)) {
            console.error('tag not allowed:',tag,allowed)
            return
        }
        return `<${tag}>${value}</${tag}>`
    },
    unwrapTag(value,tag) {
        let retVal = value
        retVal = _.trimStart(retVal,`<${tag}>`)
        retVal = _.trimEnd(retVal,`</${tag}>`)
        return retVal
    },

    dieAvg(sides) {
        return ((sides+1)/2)
    },
    
    diceAvg(nr,sides,bonus,trunc) {
        let retVal = (((sides+1)/2) * nr) + (bonus||0)
        if (!trunc) {
            return retVal
        } else if (trunc == 'up') {
            return Math.ceil(retVal)
        } else {
            return Math.floor(retVal)
        }
    },
    // returns 1d4 + 5
    // or a single values if:
    //
    // "d1":
    // 1d1 + 0  => 1
    // 2d1 + 0  => 2
    // 3d1 + 1  => 4
    //
    // "0d0 + x":
    // 0d0 + 1  => 1
    // 0d0 + 2  => 2
    formulaAsString(dice,die,bonus) {

        // 0d / d0
        if (die == 0 || dice == 0) {
            if (bonus) {
                return bonus
            } else {
                return "0"
            }
        }

        // d1
        if (die == 1) {
            return `${dice+bonus}`
        }

        // "normal"
        let retStr = `${dice}d${die}`
        if (bonus) {
            retStr += ` + ${bonus}`
        }
        console.log('formulaAsString',retStr)
        return retStr
    },
    // Reverse of formulaToString
    // 3d1 + 1 => {
    //      avg: 3
    //      min: 2
    //      max: 4
    // }
    formulaToNumber(formulaString, round) {
        if (_.isNumber(formulaString)) {
            return {
                valid : true,
                avg: formulaString,
                max: formulaString,
                min: formulaString,
                dice         : 1, // 1d1
                die          : 1, //
                mod_num      : 0,
                mod_str      : "",
                formatted    : formulaString,
                }
        }

        // Remove all spaces
        const formula = formulaString.replace(/ /g,'')

        // Defaults
        let retObject = {
            valid        : false,
            avg          : 0,
            min          : 0,
            max          : 0,
            dice         : 0,
            die          : 0,
            mod_num      : 0,
            mod_str      : "",
            formatted    : formulaString,
        }

        // Parse formula
        const regex = /(\d+)?d(\d+)([\+|\-]\d+)?/gm;
        const match = [...formula.matchAll(regex)][0]
        if (!_.isArray(match)) {
            return retObject
        } else if (match.length==4) {
            retObject.valid   = true
            const dice    = parseInt(match[1]) || 1
            const die     = parseInt(match[2]) || 1
            const mod_str = match[3]
            const mod_num = _.toNumber(mod_str) || 0

            //console.log('stat basics dice',dice)
            //console.log('stat basics die',die)
            //console.log('stat basics mod_str',mod_str)
            //console.log('stat basics mod_num',mod_num)

            // Basics
            retObject.dice    = dice
            retObject.die     = die
            retObject.mod_str = mod_str||""
            retObject.mod_num = mod_num

            // Avg.
            retObject.avg = this.diceAvg(
                dice,
                die,
                mod_num,
                round)

            // Format as: 1d8, 1d8 + 10, 1d8 - 10
            let parts = [`${dice}d${die}`]
            if (mod_str) {
                if (mod_num >= 0) {
                    parts.push("+")
                } else {
                    parts.push("-")
                }
                parts.push(Math.abs(mod_num))
            }
            retObject.formatted = parts.join(" ")
        }
        return retObject
    },
    // parse a single 1d2 formula
    __parseFormula(v) {
        let retObject = {
            dice: 0,
            die : 0,
            avg : 0,
        }
        const regex = /(\d+)?d(\d+)/gm;
        const match = [...v.matchAll(regex)][0]
        if (!_.isArray(match)) {
            return null
        }
        if (match.length==3 && match[2]) {
            retObject.valid   = true
            retObject.dice    = parseInt(match[1]) || 1
            retObject.die     = parseInt(match[2]) // mandatory
            retObject.avg     = this.diceAvg(
                retObject.dice,
                retObject.die)
        }
        return retObject
    },

    // next version of formulaToNumber(formulaString, round)
    // formulaString accepts multiple formula's separated by +
    parseFormula(formulaString, round) {

        // Defaults
        let retObject = {
            valid        : true,  // false if __parseFormula fails
            formula      : false, // has a formula (it's possbile there's only a fixed value)
            avg          : 0,
            //min        : 0,    // #todo?
            //max        : 0,    // #todo?
            //dice       : null, // #todo?
            //mod        : 0,    // needed?
            formatted    : "",
        }

        // Remove all spaces
        const formula = formulaString.replace(/ /g,'')

        // Split by "+"" or "plus"
        const arrFormula = formula.split(/plus|\+/g)
        const arrSeparators = formula.match(/plus|\+/g)
        
        arrFormula.forEach((fe,index) => {

            // Simply ignore empty strings
            // Can happen as user is typing..
            if (fe == "") {
                return
            }

            // Add separator (same as provided, a "+" or "plus")
            if (index > 0) {
                retObject.formatted += ` ${arrSeparators[index-1]} `
            }

            // Add value (single number or 1d2 formula)
            const asInt = _.toNumber(fe) // DONT USE PARSEINT! 1d12 => 1
            if (!_.isNaN(asInt)) {
                retObject.avg += asInt
                retObject.min += asInt
                retObject.max += asInt
                retObject.formatted += `${fe}`
            } else {
                const x = this.__parseFormula(fe)
                if (!x) {
                    retObject.valid = false
                } else {
                    retObject.formula = true
                    retObject.avg += x.avg
                    retObject.min += x.min
                    retObject.max += x.max
                    retObject.formatted += `${x.dice}d${x.die}`
                }
            }
        })

        // Ceil or floor it
        if (round == 'ceil') {
            retObject.avg = Math.ceil(retObject.avg)
        } else if (round == 'floor') {
            retObject.avg = Math.floor(retObject.avg)
        }

        return retObject
    },

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    },


    //return the value, postfixed with an ordinal indicator (st,nd,rd,th)
    // not tested for negatives
    ordIndValue(value) {
        if (value == 0.3) {
            return "a third"
        } else if (value == 0.5) {
            return "half"
        } else
        if (parseInt(value%10) == 1 && (parseInt(value) == 1 || parseInt(value) > 13)) {
            return value+"st"
        } else if (parseInt(value%10) == 2 && (parseInt(value) == 2 || parseInt(value) > 13)) {
            return value+"nd"
        } else if (parseInt(value%10) == 3 && (parseInt(value) == 3 || parseInt(value) > 13)) {
            return value+"rd"
        } else {
            return value+"th"
        }
    },

    /*
     * 0 => Cantrip
     * 1 => 1st Level
     * 2 => 2nd Level
     * 3 => 3rd Level
     * 4 => 4th Level
     * etc.
     */
    spellLevelToText(level) {
        if (level == 0) {
            return "Cantrip"
        } else {
            return `${this.ordIndValue(level)} Level`
        }
    },

    // Returns an oxford-style string for a given array
    //   example oxford( ["one","two","three"], "and", null)
    //   returns one, two, and three
    //   ifEmpty
    //      The text returned when the array is empty.
    //   commaTwo
    //      The Oxford comma must be used only if the list of items is AT LEAST THREE,
    //      unless commaTwo is true.
    //      one and two
    //      one, and two
    
    oxford(arr, conjunction,{ifEmpty=null,commaTwo=false}={}){
        let l = arr.length;
        if (!l) return ifEmpty;
        if (l<2) return arr[0];
        if (l<3 && !commaTwo) return arr.join(` ${conjunction} `);
        arr = arr.slice();
        arr[l-1] = `${conjunction} ${arr[l-1]}`;
        return arr.join(", ");
    },
    
    // Returns the number 1-9 as text.
    //   Numbers outside this ranged
    //   will be returned as number.
    numberToText(number,indUpperFirst) {
        let retVal = number
        let map = {
              1: "one"
            , 2: "two"
            , 3: "three"
            , 4: "four"
            , 5: "five"
            , 6: "six"
            , 7: "seven"
            , 8: "eight"
            , 9: "nine"
        }
        if (number in map) {
            retVal = map[number]
            if (indUpperFirst) {
                retVal = _.upperFirst(retVal)
            }
        }
        return retVal
    },

    /*

        doesn't work and no time to figure out why...
        .. will use the titleCase package instead.
        https://github.com/blakeembrey/change-case/tree/master/packages/title-case


     * Title Caps
     *
     * Found at: https://johnresig.com/blog/title-capitalization-in-javascript/
     * 
     * Ported to JavaScript By John Resig - http://ejohn.org/ - 21 May 2008
     * Original by John Gruber - http://daringfireball.net/ - 10 May 2008
     * License: http://www.opensource.org/licenses/mit-license.php
     *
     titleCaps(title) {
        var small = "(a|an|and|as|at|but|by|en|for|if|in|of|on|or|the|to|v[.]?|via|vs[.]?)";
        var punct = "([!\"#$%&'()*+,./:;<=>?@[\\\\\\]^_`{|}~-]*)";
        var parts = [], split = /[:.;?!] |(?: |^)["Ò]/g, index = 0;

        function lower(word){
            return word.toLowerCase();
        }
        
        function upper(word){
          return word.substr(0,1).toUpperCase() + word.substr(1);
        }
        
        while (true) {
            var m = split.exec(title);

            parts.push( title.substring(index, m ? m.index : title.length)
                .replace(/\b([A-Za-z][a-z.'Õ]*)\b/g, function(all){
                    return /[A-Za-z]\.[A-Za-z]/.test(all) ? all : upper(all);
                })
                .replace(RegExp("\\b" + small + "\\b", "ig"), lower)
                .replace(RegExp("^" + punct + small + "\\b", "ig"), function(all, punct, word){
                    return punct + upper(word);
                })
                .replace(RegExp("\\b" + small + punct + "$", "ig"), upper));
            
            index = split.lastIndex;
            
            if ( m ) parts.push( m[0] );
            else break;
        }
        
        return parts.join("").replace(/ V(s?)\. /ig, " v$1. ")
            .replace(/(['Õ])S\b/ig, "$1s")
            .replace(/\b(AT&T|Q&A)\b/ig, function(all){
                return all.toUpperCase();
            });
    },
    */

    //
    // Returns the amount in either grams or kg's
    // 
    // https://www.reddit.com/r/grammar/comments/93gys8/is_it_1_lb_or_1lbs_2_lb_or_2_lbs_pound_problem/
    // in short, use "lb", always. No "s", No "."
    lbToKgG(lb) {
        const convLb = 453.592 // LB -> G
        let g = Math.round(lb * convLb)
        if (g > 1000) {
            return `${_.round(g/1000,1)} kg`
        } else {
            return `${g} g`
        }
    },

    // return avatar initials from a name
    initials(value) {
        if(!_.isString(value)) {
            return '?'
        }

        value = value.replace(/[^a-zA-Z0-9]/g, '');
        var names = value.split(" ")
        var retVal = null

        if (names.length == 1) {
            if (names[0].length > 1) {
                // first two characters
                retVal = names[0].substring(0,2)
            } else {
                // return first letter only
                retVal = names[0]
            }
        } else if (names.length > 1) {
            let firstLetter = names[0].charAt(0)
            let secondLetter = names[names.length-1].charAt(0)
            retVal = firstLetter+secondLetter
        }
        return retVal.toUpperCase()
    },

    // arrAbilityId: Id's to choose from; eg. [1,2,6] Str, Dex, or Cha.
    // objAbility: Object with modifiers; eg. {1:5, 2:4, 3:0, 4:1, 5:2, 6:5}
    // XX returns first ID with highest modifier. In this example will return 1.
    bestOfAbility(arrAbilityId,objAbility) {
        const arrAbility = [
            {id: 1, mod: objAbility[1], name: 'Strength'},
            {id: 2, mod: objAbility[2], name: 'Dexterity'},
            {id: 4, mod: objAbility[3], name: 'Constitution'},
            {id: 3, mod: objAbility[4], name: 'Intelligence'},
            {id: 5, mod: objAbility[5], name: 'Wisdom'},
            {id: 6, mod: objAbility[6], name: 'Charisma'},
        ]
        let arrAbilityOpts = arrAbility.filter(o => arrAbilityId.includes(o.id))
        let bestMod = _.max(arrAbilityOpts.map(o => o.mod))
        let arrIds = arrAbilityOpts.filter(o => o.mod == bestMod).map(o => o.id) || []
        let arrNames = arrAbilityOpts.filter(o => o.mod == bestMod).map(o => o.name) || []

        console.log('bestOfAbility',arrAbilityId,objAbility, arrAbilityOpts, bestMod,arrNames)
        return {
            id  : arrIds,
            name: arrNames.join("/"), // ex: "Strength", "Strength/Charisma"
            mod : bestMod,            // ex: 5
        }
    },

    arrayToObject(arr, keyField) {
        return Object.assign({}, ...arr.map(item => ({[item[keyField]]: item})))
    },

    arrayToObjectPick(arr, keyField, pick) {
        return Object.assign({}, ...arr.map(item => ({[item[keyField]]: _.pick(item,pick)})))
    },

    // Example: arrayToMapish(tblCreatureSize, 'creature_size_id', 'creature_size_name')
    // Not a real map -> Mapish
    arrayToMapish(arr, keyField, valField) {
        return Object.assign({}, ...arr.map(item => ({[item[keyField]]: item[valField]})))
    },

    // await db.dom_alignment.orderBy('[alignment_id+alignment_name]').keys()
    // "Flat"
    // arr = 
    keysToObject(arr, keyIndex=0, valIndex=1) {
        let retObject = {}
        arr.forEach(o => retObject[o[keyIndex]] = o[valIndex])
        return retObject
    },

    // HASH-kind
    //https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
    cyrb53(str, seed = 0) {
        if (str === undefined) {
            return
        }
        let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
        for (let i = 0, ch; i < str.length; i++) {
            ch = str.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
        h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
        return 4294967296 * (2097151 & h2) + (h1>>>0);
    },
}
/**
 * @class Inflectr
 */

var Inflectr = {
  softFrontalSuffixes : [
    '^hal$', '^yar$', '^mecal$', '.+lal$', 'i[^aeıioöuü]+ti[^aeıioöuü]*al' // TODO takat, şefkat, firkat
  ],
  hardFrontalSuffixes : [
    '.+aat$'
  ],
  frontVowels : 'aıou',
  backVowels : 'eiöü',
  frontUnroundedVowels : 'aı',
  frontRoundedVowels : 'ou',
  backUnroundedVowels : 'ei',
  backRoundedVowels : 'öü'

};


/**
 * Trims string and replace multiple whitespaces with single
 * @method fix
 * @param {string} str
 */

Inflectr.fix = function (str) {
  return str.trim()
    .replace(/  +/g, ' ');
};


/**
 * Replaces Turkish special characters with Latin Basic equivalents.
 * @method replaceTurkishChars
 * @param {string} str
 */

Inflectr.replaceTurkishChars = function (str) {
  var f = 'çÇğĞıİöÖşŞüÜ';
  var r = 'cCgGiIoOsSuU';
  str = str.replace(/([çÇğĞıİöÖşŞüÜ]{1})/g, function(letter){
    return r.charAt(f.indexOf(letter));
  });
  return str;
};


/**
 * Remove multiple spaces and remove any special chars
 * @method clean
 * @param {string} str
 */

Inflectr.clean = function (str) {
  str = this.fix(str);
  str = str.replace(/[^a-zA-Z0-9_-\s]/g, '');
  return str;
};


/**
 * Returns string to lower case
 * @method lower
 * @param {string} str
 */

Inflectr.lower = function (str) {
  var f = 'ÇĞIİÖŞÜ';
  var r = 'çğıiöşü';
  str = str.replace(/([ÇĞIİÖŞÜ]{1})/g, function (letter) {
    return r.charAt(f.indexOf(letter));
  });
  str = str.toLowerCase();
  return str;
};


/**
 * Returns string to upper case
 * @method upper
 * @param {string} str
 */

Inflectr.upper = function (str) {
  var f = 'çğıiöşü';
  var r = 'ÇĞIİÖŞÜ';
  str = str.replace(/([çğıiöşü]{1})/g, function(letter){
    return r.charAt(f.indexOf(letter));
  });
  str = str.toUpperCase();
  return str;
};


/**
 * Returns string to title case
 * @method title
 * @param {string} str
 */

Inflectr.title = function (str) {
  str = this.lower(str);
  return str.replace(/(\S+)/g, function (word) {
    return Inflectr.upper(word.charAt(0)) + word.slice(1);
  });
};


/**
 * Returns string to slug with given separator
 * @method camel
 * @param {string} str
 * @param {string} separator
 * @default '-'
 */

Inflectr.slug = function (str, separator) {
  separator = separator === undefined ? '-' : separator;
  str = this.replaceTurkishChars(str);
  str = this.clean(str);
  str = this.lower(str);
  str = str.replace(/[_-\s]/g, separator);
  return str;
};


/**
 * Returns string to snake case
 * @method snake
 * @param {string} str
 */

Inflectr.snake = function (str) {
  return this.slug(str, '_');
};


/**
 * Returns string to kebab case
 * @method kebab
 * @param {string} str
 */

Inflectr.kebab = function (str) {
  return this.slug(str);
};


/**
 * Returns string to class case
 * @method class
 * @param {string} str
 */

Inflectr.class = function (str) {
  str = this.title(str);
  str = this.replaceTurkishChars(str);
  str = this.clean(str);
  return str.replace(/ +/g, '');
};


/**
 * Returns string to camel case
 * @method camel
 * @param {string} str
 */

Inflectr.camel = function (str) {
  str = this.class(str);
  str = str.charAt(0).toLowerCase() + str.slice(1);
  return str;
};


/**
 * Returns word to plural case
 * @method plural
 * @param {string} word
 */

Inflectr.plural = function (word) {
  var regex = '(.*[eiöü][^aeıioöuü]*$|' + this.softFrontalSuffixes.join('|') + '|' + this.hardFrontalSuffixes.join('|') + ')' + // p1
             '|(.*[aıou][^aeıioöuü]*$)'; // p2

  return word.replace(new RegExp(regex, 'i'), function (match, p1, p2) {
    if (p1 !== undefined) {
      return match + 'ler';
    }
    else if (p2 !== undefined) {
      return match + 'lar';
    }
    else {
      return match;
    }
  });
};


/**
 * Returns plural case word to singular case
 * @method singular
 * @param {string} word
 */

Inflectr.singular = function (word) {
  var regex = '(l[ae]r)$';
  return word.replace(new RegExp(regex, 'i'), '');
};


/**
 * Returns word to genitive case
 * @method genitive
 * @param {string} word
 */

Inflectr.genitive = function (word) {
  var regex = '(' + this.softFrontalSuffixes.join('|') + '|' + this.hardFrontalSuffixes.join('|') + ')' +  // p1
    '|(.*[aı]$)' + // p2
    '|(.*[ei]$)' + // p3
    '|(.*[ou]$)' + // p4
    '|(.*[öü]$)' + // p5
    '|(.*[aı][^aeıioöuü]*$)' + // p6
    '|(.*[ei][^aeıioöuü]*$)' + // p7
    '|(.*[ou][^aeıioöuü]*$)' + // p8
    '|(.*[öü][^aeıioöuü]*$)'; // p9

  return word.replace(new RegExp(regex, 'i'), function (match, p1, p2, p3, p4, p5, p6, p7, p8, p9) {
    if (p1 !== undefined) {
      return match + 'in';
    }
    else if (p2 !== undefined) {
      return match + 'nın';
    }
    else if (p3 !== undefined) {
      return match + 'nin';
    }
    else if (p4 !== undefined) {
      return match + 'nun'
    }
    else if (p5 !== undefined) {
      return match + 'nün'
    }
    else if (p6 !== undefined) {
      return Inflectr.softenLast(match) + 'ın'
    }
    else if (p7 !== undefined) {
      return Inflectr.softenLast(match) + 'in'
    }
    else if (p8 !== undefined) {
      return Inflectr.softenLast(match) + 'un'
    }
    else if (p9 !== undefined) {
      return Inflectr.softenLast(match) + 'ün'
    }
    else {
      return match;
    }
  });
};


/**
 * Returns word to accusative case
 * @method accusative
 * @param {string} word
 */

Inflectr.accusative = function (word) {
  var regex = '(' + this.softFrontalSuffixes.join('|') + '|' + this.hardFrontalSuffixes.join('|') + ')' +  // p1
    '|(.*[aı]$)' + // p2
    '|(.*[ei]$)' + // p3
    '|(.*[ou]$)' + // p4
    '|(.*[öü]$)' + // p5
    '|(.*[aı][^aeıioöuü]*$)' + // p6
    '|(.*[ei][^aeıioöuü]*$)' + // p7
    '|(.*[ou][^aeıioöuü]*$)' + // p8
    '|(.*[öü][^aeıioöuü]*$)'; // p9

  return word.replace(new RegExp(regex, 'i'), function (match, p1, p2, p3, p4, p5, p6, p7, p8, p9) {
    if (p1 !== undefined) {
      return match + 'i';
    }
    else if (p2 !== undefined) {
      return match + 'yı';
    }
    else if (p3 !== undefined) {
      return match + 'yi';
    }
    else if (p4 !== undefined) {
      return match + 'yu'
    }
    else if (p5 !== undefined) {
      return match + 'yü'
    }
    else if (p6 !== undefined) {
      return Inflectr.softenLast(match) + 'ı'
    }
    else if (p7 !== undefined) {
      return Inflectr.softenLast(match) + 'i'
    }
    else if (p8 !== undefined) {
      return Inflectr.softenLast(match) + 'u'
    }
    else if (p9 !== undefined) {
      return Inflectr.softenLast(match) + 'ü'
    }
    else {
      return match;
    }
  });
};


/**
 * Returns word to dative case
 * @method dative
 * @param {string} word
 */

Inflectr.dative = function (word) {
  var regex = '(.*[aıou]$)' + // p1
    '|(.*[eiöü]$)' + // p2
    '|(' + this.softFrontalSuffixes.join('|') + '|' + this.hardFrontalSuffixes.join('|') + ')' +  // p3
    '|(.*[eiöü][^aeıioöuü]*$)' + // p4
    '|(.*[aıou][^aeıioöuü]*$)'; // p5
  return word.replace(new RegExp(regex, 'i'), function (match, p1, p2, p3, p4, p5) {
    if (p1 !== undefined) {
      return match + 'ya';
    }
    else if (p2 !== undefined) {
      return match + 'ye';
    }
    else if (p3 !== undefined) {
      return match + 'e';
    }
    else if (p4 !== undefined) {
      return Inflectr.softenLast(match) + 'e';
    }
    else if (p5 !== undefined) {
      return Inflectr.softenLast(match) + 'a';
    }
    else {
      return match;
    }
  });
};


/**
 * Returns word to locative case
 * @method locative
 * @param {string} word
 */

Inflectr.locative = function (word) {
  var regex = '(.*[eiöü][^aeıioöuü]*[çfhkpsşt]$|' + this.hardFrontalSuffixes.join('|') + ')' + // p1
      '|(.*[eiöü][^aeıioöuü]*$|' + this.softFrontalSuffixes.join('|') + ')' + // p2
      '|(.*[aıou][^aeıioöuü]*[çfhkpsşt]$)' + // p3
      '|(.*[aıou][^aeıioöuü]*$)'; // p4

  return word.replace(new RegExp(regex, 'i'), function (match, p1, p2, p3, p4) {
    if (p1 !== undefined) {
      return match + 'te';
    }
    else if (p2 !== undefined) {
      return match + 'de';
    }
    else if (p3 !== undefined) {
      return match + 'ta';
    }
    else if (p4 !== undefined) {
      return match + 'da';
    }
    else {
      return match;
    }
  });
};


/**
 * Returns word to ablative case
 * @method ablative
 * @param {string} word
 */

Inflectr.ablative = function (word) {
  var regex = '(.*[eiöü][^aeıioöuü]*[çfhkpsşt]$|' + this.hardFrontalSuffixes.join('|') + ')' + // p1
    '|(.*[eiöü][^aeıioöuü]*$|' + this.softFrontalSuffixes.join('|') + ')' + // p2
    '|(.*[aıou][^aeıioöuü]*[çfhkpsşt]$)' + // p3
    '|(.*[aıou][^aeıioöuü]*$)'; // p4

  return word.replace(new RegExp(regex, 'i'), function (match, p1, p2, p3, p4) {
    if (p1 !== undefined) {
      return match + 'ten';
    }
    else if (p2 !== undefined) {
      return match + 'den';
    }
    else if (p3 !== undefined) {
      return match + 'tan';
    }
    else if (p4 !== undefined) {
      return match + 'dan';
    }
    else {
      return match;
    }
  });
};


Inflectr.toNounCoumpound = function (word1, word2) {
  return Inflectr.genitive(word1) + ' ' + Inflectr.to3rdPersonSingularPossessive(word2);
};

Inflectr.softenConsonant = function (consonant) {
  var f = 'çkpt';
  var r = 'cğbd';
  var i = f.indexOf(consonant);
  if (i > -1) {
    consonant = r[i];
  }
  return consonant;
};

Inflectr.softenLast = function (str) {
  if ('çkpt'.indexOf(str.slice(-1)) > -1) {
    var exceptions = [
      '.+aat$',
      'm[ae][^aeıioöuü]{1,2}u[^aeıioöuü]at$', // mefulat, meşrubat, mefruşat, malumat, makulat
      'ta[^aeıioöuü]?i[^aeıioöuü]at$', // talimat, tafsilat, tahribat
      '[^aeıioöuü]?i[^aeıioöuü]a[^aeıioöuü]et$', // ziyaret, ticaret
      'i[^aeıioöuü]{2}a[^aeıioöuü]*at$', // ihracat, icraat, ithalat
      '[^aeıioöuü][ae][^aeıioöuü]i[^aeıioöuü]et$', // fazilet, cemiyet, vasiyet, vaziyet
      '[^aeıioöuü][ae][^aeıioöuü]a[^aeıioöuü]et$', // keramet, cenabet, garabet
      '(?!gök|çok)^[^aeıioöuü]?[aeıioöuü][çkpt]$' // top, tip, cop, ip, hep, tek, ek, iç, piç, ot, at, kat
    ];
    // TODO vaziyet, vasiyet
    var regex = exceptions.join('|');

    if (new RegExp(regex, 'gi').test(str)) {
      return str;
    }

    var match = '(.+)([çkpt]$)';
    return str.replace(new RegExp(match, 'i'), function (match, p1, p2) {
      return p1 + Inflectr.softenConsonant(p2);
    });
  }
  else {
    return str;
  }
};


// İyelik eki
Inflectr.possessive = function (person, plurality) {

};

Inflectr.to1stPersonSingularPossessive = function (word) {
  var regex = '(.*[aeıioöuü]$)' + // p1
             '|(.*[ou][^aeıioöuü]*$)' + // p2
             '|(.*[öü][^aeıioöuü]*$)' + // p3
             '|(.*[ei][^aeıioöuü]*$|' + this.softFrontalSuffixes.join('|') + '|' + this.hardFrontalSuffixes.join('|') + ')' + // p4
             '|(.*[aı][^aeıioöuü]*$)'; // p5

  return word.replace(new RegExp(regex, 'i'), function (match, p1, p2, p3, p4, p5) {
    if (p1 !== undefined) {
      return match + 'm';
    }
    else if (p2 !== undefined) {
      return Inflectr.softenLast(match) + 'um';
    }
    else if (p3 !== undefined) {
      return Inflectr.softenLast(match) + 'üm';
    }
    else if (p4 !== undefined) {
      return Inflectr.softenLast(match) + 'im';
    }
    else if (p5 !== undefined) {
      return Inflectr.softenLast(match) + 'ım';
    }
    else {
      return match;
    }
  });
};

Inflectr.to2ndPersonSingularPossessive = function (word) {
  var regex = '(.*[aeıioöuü]$)' + // p1
    '|(.*[ou][^aeıioöuü]*$)' + // p2
    '|(.*[öü][^aeıioöuü]*$)' + // p3
    '|(.*[ei][^aeıioöuü]*$|' + this.softFrontalSuffixes.join('|') + '|' + this.hardFrontalSuffixes.join('|') + ')' + // p4
    '|(.*[aı][^aeıioöuü]*$)'; // p5

  return word.replace(new RegExp(regex, 'i'), function (match, p1, p2, p3, p4, p5) {
    if (p1 !== undefined) {
      return match + 'n';
    }
    else if (p2 !== undefined) {
      return Inflectr.softenLast(match) + 'un';
    }
    else if (p3 !== undefined) {
      return Inflectr.softenLast(match) + 'ün';
    }
    else if (p4 !== undefined) {
      return Inflectr.softenLast(match) + 'in';
    }
    else if (p5 !== undefined) {
      return Inflectr.softenLast(match) + 'ın';
    }
    else {
      return match;
    }
  });
};

Inflectr.to3rdPersonSingularPossessive = function (word) {
  var regex = '(.*[aı]$)' + // p1
    '|(.*[ei]$)' + // p2
    '|(.*[ou]$)' + // p3
    '|(.*[öü]$)' + // p4
    '|(.*[ou][^aeıioöuü]*$)' + // p7
    '|(.*[öü][^aeıioöuü]*$)' + //
    '|(.*[ei][^aeıioöuü]*$|' + this.softFrontalSuffixes.join('|') + '|' + this.hardFrontalSuffixes.join('|') + ')' +  // p6
    '|(.*[aı][^aeıioöuü]*$)'; // p5

  return word.replace(new RegExp(regex, 'i'), function (match, p1, p2, p3, p4, p5, p6, p7, p8) {
    if (p1 !== undefined) {
      return match + 'sı';
    }
    else if (p2 !== undefined) {
      return match + 'si';
    }
    else if (p3 !== undefined) {
      return match + 'su'
    }
    else if (p4 !== undefined) {
      return match + 'sü'
    }
    else if (p5 !== undefined) {
      return Inflectr.softenLast(match) + 'u'
    }
    else if (p6 !== undefined) {
      return Inflectr.softenLast(match) + 'ü'
    }
    else if (p7 !== undefined) {
      return Inflectr.softenLast(match) + 'i'
    }
    else if (p8 !== undefined) {
      return Inflectr.softenLast(match) + 'ı'
    }
    else {
      return match;
    }
  });
};

Inflectr.to1stPersonPluralPossessive = function (word) {
  var regex = '(.*[aı]$)' + // p1
    '|(.*[ei]$)' + // p2
    '|(.*[ou]$)' + // p3
    '|(.*[öü]$)' + // p4
    '|(.*[ou][^aeıioöuü]*$)' + // p7
    '|(.*[öü][^aeıioöuü]*$)' + //
    '|(.*[ei][^aeıioöuü]*$|' + this.softFrontalSuffixes.join('|') + '|' + this.hardFrontalSuffixes.join('|') + ')' +  // p6
    '|(.*[aı][^aeıioöuü]*$)'; // p5

  return word.replace(new RegExp(regex, 'i'), function (match, p1, p2, p3, p4, p5, p6, p7, p8) {
    if (p1 !== undefined) {
      return match + 'mız';
    }
    else if (p2 !== undefined) {
      return match + 'miz';
    }
    else if (p3 !== undefined) {
      return match + 'muz'
    }
    else if (p4 !== undefined) {
      return match + 'müz'
    }
    else if (p5 !== undefined) {
      return Inflectr.softenLast(match) + 'umuz'
    }
    else if (p6 !== undefined) {
      return Inflectr.softenLast(match) + 'ümüz'
    }
    else if (p7 !== undefined) {
      return Inflectr.softenLast(match) + 'imiz'
    }
    else if (p8 !== undefined) {
      return Inflectr.softenLast(match) + 'ımız'
    }
    else {
      return match;
    }
  });
};

Inflectr.to2ndPersonPluralPossessive = function (word) {
  var regex = '(.*[aı]$)' + // p1
    '|(.*[ei]$)' + // p2
    '|(.*[ou]$)' + // p3
    '|(.*[öü]$)' + // p4
    '|(.*[ou][^aeıioöuü]*$)' + // p7
    '|(.*[öü][^aeıioöuü]*$)' + //
    '|(.*[ei][^aeıioöuü]*$|' + this.softFrontalSuffixes.join('|') + '|' + this.hardFrontalSuffixes.join('|') + ')' +  // p6
    '|(.*[aı][^aeıioöuü]*$)'; // p5

  return word.replace(new RegExp(regex, 'i'), function (match, p1, p2, p3, p4, p5, p6, p7, p8) {
    if (p1 !== undefined) {
      return match + 'nız';
    }
    else if (p2 !== undefined) {
      return match + 'niz';
    }
    else if (p3 !== undefined) {
      return match + 'nuz'
    }
    else if (p4 !== undefined) {
      return match + 'nüz'
    }
    else if (p5 !== undefined) {
      return Inflectr.softenLast(match) + 'unuz'
    }
    else if (p6 !== undefined) {
      return Inflectr.softenLast(match) + 'ünüz'
    }
    else if (p7 !== undefined) {
      return Inflectr.softenLast(match) + 'iniz'
    }
    else if (p8 !== undefined) {
      return Inflectr.softenLast(match) + 'ınız'
    }
    else {
      return match;
    }
  });
};

Inflectr.to3rdPersonPluralPossessive = function (word) {
  var regex = '(.*[eiöü][^aeıioöuü]*$|' + this.softFrontalSuffixes.join('|') + '|' + this.hardFrontalSuffixes.join('|') + ')' + // p1
    '|(.*[aıou][^aeıioöuü]*$)'; // p2

  return word.replace(new RegExp(regex, 'i'), function (match, p1, p2) {
    if (p1 !== undefined) {
      return match + 'leri';
    }
    else if (p2 !== undefined) {
      return match + 'ları';
    }
    else {
      return match;
    }
  });
};

var itr = Inflectr;

if (module && module !== undefined) {
  module.exports = Inflectr;
}
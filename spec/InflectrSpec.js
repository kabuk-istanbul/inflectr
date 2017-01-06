describe("Inflectr", function() {
  var itr = require('../../inflectr');

  it("should trim string and remove multiline whitespaces", function() {
    expect(itr.fix('    hello    world   ')).toEqual('hello world');
  });

  it("should replace Turkish special chars in string with Latin Base equivalent", function() {
    expect(itr.replaceTurkishChars('çÇğĞıİöÖşŞüÜ')).toEqual('cCgGiIoOsSuU');
  });

  it("should remove any special chars from string", function() {
    expect(itr.clean('a()=*?&!şğ')).toEqual('a');
  });

  it("should make string lowercase", function() {
    expect(itr.lower('İŞİ ÇOK AĞIRDI, ÖLDÜ')).toEqual('işi çok ağırdı, öldü');
  });

  it("should make string uppercase", function() {
    expect(itr.upper('işi çok ağırdı, öldü')).toEqual('İŞİ ÇOK AĞIRDI, ÖLDÜ');
  });

  it("should make string title case", function() {
    expect(itr.title('işi çoK ağıRdı, öldü')).toEqual('İşi Çok Ağırdı, Öldü');
  });

  it("should return string to slug", function() {
    expect(itr.slug('işi çoK  ağıRdı,    öldü   ')).toEqual('isi-cok-agirdi-oldu');
  });

  it("should return string to kebab case", function() {
    expect(itr.kebab('işi çoK  ağıRdı,    öldü   ')).toEqual('isi-cok-agirdi-oldu');
  });

  it("should return string to camel case", function() {
    expect(itr.camel('işi çoK  ağıRdı,    öldü   ')).toEqual('isiCokAgirdiOldu');
  });

  it("should return string to class case", function() {
    expect(itr.class('işi çoK  ağıRdı,    öldü   ')).toEqual('IsiCokAgirdiOldu');
  });

  it("should return word to plural", function() {
    expect(itr.plural('saat')).toEqual('saatler');
    expect(itr.plural('hal')).toEqual('haller');
    expect(itr.plural('mecal')).toEqual('mecaller');
    expect(itr.plural('istiklal')).toEqual('istiklaller');
    expect(itr.plural('örgü')).toEqual('örgüler');
    expect(itr.plural('sağır')).toEqual('sağırlar');
  });

  it("should return word to singular", function() {
    expect(itr.singular('saatler')).toEqual('saat');
    expect(itr.singular('haller')).toEqual('hal');
    expect(itr.singular('sağırlar')).toEqual('sağır');
  });

  it("should return word to genitive", function() {
    expect(itr.genitive('saat')).toEqual('saatin');
    expect(itr.genitive('ihtilal')).toEqual('ihtilalin');
    expect(itr.genitive('mecal')).toEqual('mecalin');
    expect(itr.genitive('medya')).toEqual('medyanın');
    expect(itr.genitive('kapı')).toEqual('kapının');
    expect(itr.genitive('deve')).toEqual('devenin');
    expect(itr.genitive('emmi')).toEqual('emminin');
    expect(itr.genitive('koro')).toEqual('koronun');
    expect(itr.genitive('boru')).toEqual('borunun');
    expect(itr.genitive('fetö')).toEqual('fetönün');
    expect(itr.genitive('görü')).toEqual('görünün');
    expect(itr.genitive('başkan')).toEqual('başkanın');
    expect(itr.genitive('yarın')).toEqual('yarının');
    expect(itr.genitive('dönem')).toEqual('dönemin');
    expect(itr.genitive('devrim')).toEqual('devrimin');
    expect(itr.genitive('salon')).toEqual('salonun');
    expect(itr.genitive('sorun')).toEqual('sorunun');
    expect(itr.genitive('armatör')).toEqual('armatörün');
    expect(itr.genitive('dürüm')).toEqual('dürümün');
    expect(itr.genitive('oruç')).toEqual('orucun');
    expect(itr.genitive('çelik')).toEqual('çeliğin');
    expect(itr.genitive('dolap')).toEqual('dolabın');
    expect(itr.genitive('taşıt')).toEqual('taşıdın');
  });

  it("should return word to accusative", function() {
    expect(itr.accusative('saat')).toEqual('saati');
    expect(itr.accusative('ihtilal')).toEqual('ihtilali');
    expect(itr.accusative('mecal')).toEqual('mecali');
    expect(itr.accusative('medya')).toEqual('medyayı');
    expect(itr.accusative('kapı')).toEqual('kapıyı');
    expect(itr.accusative('deve')).toEqual('deveyi');
    expect(itr.accusative('emmi')).toEqual('emmiyi');
    expect(itr.accusative('koro')).toEqual('koroyu');
    expect(itr.accusative('boru')).toEqual('boruyu');
    expect(itr.accusative('fetö')).toEqual('fetöyü');
    expect(itr.accusative('görü')).toEqual('görüyü');
    expect(itr.accusative('başkan')).toEqual('başkanı');
    expect(itr.accusative('yarın')).toEqual('yarını');
    expect(itr.accusative('dönem')).toEqual('dönemi');
    expect(itr.accusative('devrim')).toEqual('devrimi');
    expect(itr.accusative('salon')).toEqual('salonu');
    expect(itr.accusative('sorun')).toEqual('sorunu');
    expect(itr.accusative('armatör')).toEqual('armatörü');
    expect(itr.accusative('dürüm')).toEqual('dürümü');
    expect(itr.accusative('oruç')).toEqual('orucu');
    expect(itr.accusative('çelik')).toEqual('çeliği');
    expect(itr.accusative('dolap')).toEqual('dolabı');
    expect(itr.accusative('taşıt')).toEqual('taşıdı');
  });

  it("should return word to dative case", function() {
    expect(itr.dative('saat')).toEqual('saate');
    expect(itr.dative('ihtilal')).toEqual('ihtilale');
    expect(itr.dative('mecal')).toEqual('mecale');
    expect(itr.dative('medya')).toEqual('medyaya');
    expect(itr.dative('kapı')).toEqual('kapıya');
    expect(itr.dative('deve')).toEqual('deveye');
    expect(itr.dative('emmi')).toEqual('emmiye');
    expect(itr.dative('koro')).toEqual('koroya');
    expect(itr.dative('boru')).toEqual('boruya');
    expect(itr.dative('fetö')).toEqual('fetöye');
    expect(itr.dative('görü')).toEqual('görüye');
    expect(itr.dative('başkan')).toEqual('başkana');
    expect(itr.dative('yarın')).toEqual('yarına');
    expect(itr.dative('dönem')).toEqual('döneme');
    expect(itr.dative('devrim')).toEqual('devrime');
    expect(itr.dative('salon')).toEqual('salona');
    expect(itr.dative('sorun')).toEqual('soruna');
    expect(itr.dative('armatör')).toEqual('armatöre');
    expect(itr.dative('dürüm')).toEqual('dürüme');
    expect(itr.dative('oruç')).toEqual('oruca');
    expect(itr.dative('çelik')).toEqual('çeliğe');
    expect(itr.dative('dolap')).toEqual('dolaba');
    expect(itr.dative('taşıt')).toEqual('taşıda');
  });

  it("should return word to locative case", function() {
    expect(itr.locative('saat')).toEqual('saatte');
    expect(itr.locative('ihtilal')).toEqual('ihtilalde');
    expect(itr.locative('mecal')).toEqual('mecalde');
    expect(itr.locative('medya')).toEqual('medyada');
    expect(itr.locative('kapı')).toEqual('kapıda');
    expect(itr.locative('deve')).toEqual('devede');
    expect(itr.locative('emmi')).toEqual('emmide');
    expect(itr.locative('koro')).toEqual('koroda');
    expect(itr.locative('boru')).toEqual('boruda');
    expect(itr.locative('fetö')).toEqual('fetöde');
    expect(itr.locative('görü')).toEqual('görüde');
    expect(itr.locative('başkan')).toEqual('başkanda');
    expect(itr.locative('yarın')).toEqual('yarında');
    expect(itr.locative('dönem')).toEqual('dönemde');
    expect(itr.locative('devrim')).toEqual('devrimde');
    expect(itr.locative('salon')).toEqual('salonda');
    expect(itr.locative('sorun')).toEqual('sorunda');
    expect(itr.locative('armatör')).toEqual('armatörde');
    expect(itr.locative('dürüm')).toEqual('dürümde');
    expect(itr.locative('oruç')).toEqual('oruçta');
    expect(itr.locative('çelik')).toEqual('çelikte');
    expect(itr.locative('dolap')).toEqual('dolapta');
    expect(itr.locative('taşıt')).toEqual('taşıtta');
  });

  it("should return word to ablative case", function() {
    expect(itr.ablative('saat')).toEqual('saatten');
    expect(itr.ablative('ihtilal')).toEqual('ihtilalden');
    expect(itr.ablative('mecal')).toEqual('mecalden');
    expect(itr.ablative('medya')).toEqual('medyadan');
    expect(itr.ablative('kapı')).toEqual('kapıdan');
    expect(itr.ablative('deve')).toEqual('deveden');
    expect(itr.ablative('emmi')).toEqual('emmiden');
    expect(itr.ablative('koro')).toEqual('korodan');
    expect(itr.ablative('boru')).toEqual('borudan');
    expect(itr.ablative('fetö')).toEqual('fetöden');
    expect(itr.ablative('görü')).toEqual('görüden');
    expect(itr.ablative('başkan')).toEqual('başkandan');
    expect(itr.ablative('yarın')).toEqual('yarından');
    expect(itr.ablative('dönem')).toEqual('dönemden');
    expect(itr.ablative('devrim')).toEqual('devrimden');
    expect(itr.ablative('salon')).toEqual('salondan');
    expect(itr.ablative('sorun')).toEqual('sorundan');
    expect(itr.ablative('armatör')).toEqual('armatörden');
    expect(itr.ablative('dürüm')).toEqual('dürümden');
    expect(itr.ablative('oruç')).toEqual('oruçtan');
    expect(itr.ablative('çelik')).toEqual('çelikten');
    expect(itr.ablative('dolap')).toEqual('dolaptan');
    expect(itr.ablative('taşıt')).toEqual('taşıttan');
  });

  it("should return word to first person singular possessive case", function() {
    expect(itr.to1stPersonSingularPossessive('tabanca')).toEqual('tabancam');
    expect(itr.to1stPersonSingularPossessive('elbise')).toEqual('elbisem');
    expect(itr.to1stPersonSingularPossessive('ağrı')).toEqual('ağrım');
    expect(itr.to1stPersonSingularPossessive('gösteri')).toEqual('gösterim');
    expect(itr.to1stPersonSingularPossessive('bordro')).toEqual('bordrom');
    expect(itr.to1stPersonSingularPossessive('banliyö')).toEqual('banliyöm');
    expect(itr.to1stPersonSingularPossessive('sorgu')).toEqual('sorgum');
    expect(itr.to1stPersonSingularPossessive('örgü')).toEqual('örgüm');
    expect(itr.to1stPersonSingularPossessive('zaman')).toEqual('zamanım');
    expect(itr.to1stPersonSingularPossessive('dert')).toEqual('derdim');
    expect(itr.to1stPersonSingularPossessive('yarın')).toEqual('yarınım');
    expect(itr.to1stPersonSingularPossessive('zemin')).toEqual('zeminim');
    expect(itr.to1stPersonSingularPossessive('karton')).toEqual('kartonum');
    expect(itr.to1stPersonSingularPossessive('fön')).toEqual('fönüm');
    expect(itr.to1stPersonSingularPossessive('oyun')).toEqual('oyunum');
    expect(itr.to1stPersonSingularPossessive('ölüm')).toEqual('ölümüm');
    expect(itr.to1stPersonSingularPossessive('saat')).toEqual('saatim');
    expect(itr.to1stPersonSingularPossessive('istikbal')).toEqual('istikbalim');
  });

  it("should return word to first person plural possessive case", function() {
    expect(itr.to1stPersonPluralPossessive('tabanca')).toEqual('tabancamız');
    expect(itr.to1stPersonPluralPossessive('elbise')).toEqual('elbisemiz');
    expect(itr.to1stPersonPluralPossessive('ağrı')).toEqual('ağrımız');
    expect(itr.to1stPersonPluralPossessive('gösteri')).toEqual('gösterimiz');
    expect(itr.to1stPersonPluralPossessive('bordro')).toEqual('bordromuz');
    expect(itr.to1stPersonPluralPossessive('banliyö')).toEqual('banliyömüz');
    expect(itr.to1stPersonPluralPossessive('sorgu')).toEqual('sorgumuz');
    expect(itr.to1stPersonPluralPossessive('örgü')).toEqual('örgümüz');
    expect(itr.to1stPersonPluralPossessive('zaman')).toEqual('zamanımız');
    expect(itr.to1stPersonPluralPossessive('dert')).toEqual('derdimiz');
    expect(itr.to1stPersonPluralPossessive('yarın')).toEqual('yarınımız');
    expect(itr.to1stPersonPluralPossessive('zemin')).toEqual('zeminimiz');
    expect(itr.to1stPersonPluralPossessive('karton')).toEqual('kartonumuz');
    expect(itr.to1stPersonPluralPossessive('fön')).toEqual('fönümüz');
    expect(itr.to1stPersonPluralPossessive('oyun')).toEqual('oyunumuz');
    expect(itr.to1stPersonPluralPossessive('ölüm')).toEqual('ölümümüz');
    expect(itr.to1stPersonPluralPossessive('saat')).toEqual('saatimiz');
    expect(itr.to1stPersonPluralPossessive('istikbal')).toEqual('istikbalimiz');
  });

  it("should return word to second person singular possessive case", function() {
    expect(itr.to2ndPersonSingularPossessive('tabanca')).toEqual('tabancan');
    expect(itr.to2ndPersonSingularPossessive('elbise')).toEqual('elbisen');
    expect(itr.to2ndPersonSingularPossessive('ağrı')).toEqual('ağrın');
    expect(itr.to2ndPersonSingularPossessive('gösteri')).toEqual('gösterin');
    expect(itr.to2ndPersonSingularPossessive('bordro')).toEqual('bordron');
    expect(itr.to2ndPersonSingularPossessive('banliyö')).toEqual('banliyön');
    expect(itr.to2ndPersonSingularPossessive('sorgu')).toEqual('sorgun');
    expect(itr.to2ndPersonSingularPossessive('örgü')).toEqual('örgün');
    expect(itr.to2ndPersonSingularPossessive('zaman')).toEqual('zamanın');
    expect(itr.to2ndPersonSingularPossessive('dert')).toEqual('derdin');
    expect(itr.to2ndPersonSingularPossessive('yarın')).toEqual('yarının');
    expect(itr.to2ndPersonSingularPossessive('zemin')).toEqual('zeminin');
    expect(itr.to2ndPersonSingularPossessive('karton')).toEqual('kartonun');
    expect(itr.to2ndPersonSingularPossessive('fön')).toEqual('fönün');
    expect(itr.to2ndPersonSingularPossessive('oyun')).toEqual('oyunun');
    expect(itr.to2ndPersonSingularPossessive('ölüm')).toEqual('ölümün');
    expect(itr.to2ndPersonSingularPossessive('saat')).toEqual('saatin');
    expect(itr.to2ndPersonSingularPossessive('istikbal')).toEqual('istikbalin');
  });

  it("should return word to second person singular possessive case", function() {
    expect(itr.to2ndPersonPluralPossessive('tabanca')).toEqual('tabancanız');
    expect(itr.to2ndPersonPluralPossessive('elbise')).toEqual('elbiseniz');
    expect(itr.to2ndPersonPluralPossessive('ağrı')).toEqual('ağrınız');
    expect(itr.to2ndPersonPluralPossessive('gösteri')).toEqual('gösteriniz');
    expect(itr.to2ndPersonPluralPossessive('bordro')).toEqual('bordronuz');
    expect(itr.to2ndPersonPluralPossessive('banliyö')).toEqual('banliyönüz');
    expect(itr.to2ndPersonPluralPossessive('sorgu')).toEqual('sorgunuz');
    expect(itr.to2ndPersonPluralPossessive('örgü')).toEqual('örgünüz');
    expect(itr.to2ndPersonPluralPossessive('zaman')).toEqual('zamanınız');
    expect(itr.to2ndPersonPluralPossessive('dert')).toEqual('derdiniz');
    expect(itr.to2ndPersonPluralPossessive('yarın')).toEqual('yarınınız');
    expect(itr.to2ndPersonPluralPossessive('zemin')).toEqual('zemininiz');
    expect(itr.to2ndPersonPluralPossessive('karton')).toEqual('kartonunuz');
    expect(itr.to2ndPersonPluralPossessive('fön')).toEqual('fönünüz');
    expect(itr.to2ndPersonPluralPossessive('oyun')).toEqual('oyununuz');
    expect(itr.to2ndPersonPluralPossessive('ölüm')).toEqual('ölümünüz');
    expect(itr.to2ndPersonPluralPossessive('saat')).toEqual('saatiniz');
    expect(itr.to2ndPersonPluralPossessive('istikbal')).toEqual('istikbaliniz');
  });


  it("should return word to third person singular possessive case", function() {
    expect(itr.to3rdPersonSingularPossessive('tabanca')).toEqual('tabancası');
    expect(itr.to3rdPersonSingularPossessive('elbise')).toEqual('elbisesi');
    expect(itr.to3rdPersonSingularPossessive('ağrı')).toEqual('ağrısı');
    expect(itr.to3rdPersonSingularPossessive('gösteri')).toEqual('gösterisi');
    expect(itr.to3rdPersonSingularPossessive('bordro')).toEqual('bordrosu');
    expect(itr.to3rdPersonSingularPossessive('banliyö')).toEqual('banliyösü');
    expect(itr.to3rdPersonSingularPossessive('sorgu')).toEqual('sorgusu');
    expect(itr.to3rdPersonSingularPossessive('örgü')).toEqual('örgüsü');
    expect(itr.to3rdPersonSingularPossessive('zaman')).toEqual('zamanı');
    expect(itr.to3rdPersonSingularPossessive('dert')).toEqual('derdi');
    expect(itr.to3rdPersonSingularPossessive('yarın')).toEqual('yarını');
    expect(itr.to3rdPersonSingularPossessive('zemin')).toEqual('zemini');
    expect(itr.to3rdPersonSingularPossessive('karton')).toEqual('kartonu');
    expect(itr.to3rdPersonSingularPossessive('fön')).toEqual('fönü');
    expect(itr.to3rdPersonSingularPossessive('oyun')).toEqual('oyunu');
    expect(itr.to3rdPersonSingularPossessive('ölüm')).toEqual('ölümü');
    expect(itr.to3rdPersonSingularPossessive('saat')).toEqual('saati');
    expect(itr.to3rdPersonSingularPossessive('istikbal')).toEqual('istikbali');
  });

  it("should return word to third person plural possessive case", function() {
    expect(itr.to3rdPersonPluralPossessive('tabanca')).toEqual('tabancaları');
    expect(itr.to3rdPersonPluralPossessive('elbise')).toEqual('elbiseleri');
    expect(itr.to3rdPersonPluralPossessive('ağrı')).toEqual('ağrıları');
    expect(itr.to3rdPersonPluralPossessive('gösteri')).toEqual('gösterileri');
    expect(itr.to3rdPersonPluralPossessive('bordro')).toEqual('bordroları');
    expect(itr.to3rdPersonPluralPossessive('banliyö')).toEqual('banliyöleri');
    expect(itr.to3rdPersonPluralPossessive('sorgu')).toEqual('sorguları');
    expect(itr.to3rdPersonPluralPossessive('örgü')).toEqual('örgüleri');
    expect(itr.to3rdPersonPluralPossessive('zaman')).toEqual('zamanları');
    expect(itr.to3rdPersonPluralPossessive('dert')).toEqual('dertleri');
    expect(itr.to3rdPersonPluralPossessive('yarın')).toEqual('yarınları');
    expect(itr.to3rdPersonPluralPossessive('zemin')).toEqual('zeminleri');
    expect(itr.to3rdPersonPluralPossessive('karton')).toEqual('kartonları');
    expect(itr.to3rdPersonPluralPossessive('fön')).toEqual('fönleri');
    expect(itr.to3rdPersonPluralPossessive('oyun')).toEqual('oyunları');
    expect(itr.to3rdPersonPluralPossessive('ölüm')).toEqual('ölümleri');
    expect(itr.to3rdPersonPluralPossessive('saat')).toEqual('saatleri');
    expect(itr.to3rdPersonPluralPossessive('istikbal')).toEqual('istikballeri');
  });

});

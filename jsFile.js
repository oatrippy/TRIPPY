/**
 * Created by ilker on 30.01.2016.
 */
(function() { // Sayfa Yüklenince çalışsın

    var sarkilariGetir = new XMLHttpRequest(),
        paragrafSayisi = 4,
        paragrafSatirsayisi = 4,
        song_file = "./song.txt",
        satirbasinaMinumumKelime = 2,
        satirbasinaMaximumKelime = 4,
        sarkiUret = document.getElementById("sarkiUret");
        kelimeler = [],
        sarkilar = "",
        satirlar = "";

    var  sayiUret =function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // Şarkı sözlerini yükle
    sarkilariGetir.open('GET', "song.txt", false);
    sarkilariGetir.send();

    sarkilar = sarkilariGetir.responseText;

    satirlar = sarkilar.split("\n");

    for (satir in satirlar) {
        satirlar[satir] = satirlar[satir].replace("\n", "");
        satirlar[satir] = satirlar[satir].replace("-----", "");
        satirdakiKelimeler = satirlar[satir].split(" ");

        for (sKelimeleri in satirdakiKelimeler) {
            satirdakiKelimeler[sKelimeleri] = satirdakiKelimeler[sKelimeleri].replace("\n", "");
            kelimeler.push(satirdakiKelimeler[sKelimeleri].toLowerCase());
        }
    }
    var satirUret = function() {
        kelimeSayisi = sayiUret(satirbasinaMinumumKelime, satirbasinaMaximumKelime);
        sarkiSatiri = "";
        for (i = 0; i < kelimeSayisi; i++) {
            rastgeleSayi = sayiUret(0, kelimeler.length - 1);
            sarkiSatiri += kelimeler[rastgeleSayi] + " ";
        }
        sarkiSatiri = sarkiSatiri.charAt(0).toUpperCase() + sarkiSatiri.slice(1);
        return sarkiSatiri
    }


    var paragrafUret = function() {
        var paragraf = "";
        for (x = 0; x < paragrafSatirsayisi; x++) {
            paragraf += satirUret() + "<br>";
        }
        return paragraf;
    }

    var sarkiUret = function() {
        var sarki = "";
        for (y = 0; y < paragrafSayisi; y++) {
            sarki += paragrafUret() + "<br>";
        }
        console.log(sarki);
        document.getElementById('EfsaneSarki').innerHTML = sarki;
    }

    var sarkiBasligiUret = function() {
        title = kelimeler[sayiUret(0, kelimeler.length - 1)] + " " + kelimeler[sayiUret(0, kelimeler.length - 1)] + " " + kelimeler[sayiUret(0, kelimeler.length - 1)];
        document.getElementById('efsaneSarkiBasligi').innerHTML = title.toUpperCase();
    }

    sarkiBasligiUret();
    sarkiUret();

    var btn = document.getElementById("sarkiUret");
    btn.addEventListener("click", function(){
        paragrafSayisi = document.getElementById("paragrafSayisi").value;
        paragrafSatirsayisi =  document.getElementById("kelimeSayisi").value;
        sarkiBasligiUret();
        sarkiUret();
    })

# In[29]:

def rhymes(*words):
    try:
        phons_backwards = map(lambda w: cmu_dict[w][::-1], words)
    except KeyError:
        raise Exception('Word not in dictionary.')
    
    matching_phons = list()
    for p_tup in zip(*phons_backwards):
        first_p = p_tup[0]
        if all(p == first_p for p in p_tup[1:]):
            matching_phons.append(first_p)
        else:
            break
            
    return matching_phons and matching_phons[-1][-1] in set(['1', '2'])


# In[30]:

def rhyme_finder(word):
    return filter(lambda w: rhymes(w, word), cmu_dict.keys())


# In[33]:

print '\n'.join(rhyme_finder(argv[-1]))



})();

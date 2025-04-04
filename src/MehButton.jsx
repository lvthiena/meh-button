
import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";

const apiKey = process.env.REACT_APP_GIPHY_KEY;

async function generateRandomItem() {
  const isGif = Math.random() > 0.5;

  if (isGif) {
    try {
      const res = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=meh+funny+vintage+surreal+weird&rating=pg`);
      const data = await res.json();
      let gifUrl = data.data.images.original.url;
      if (gifUrl === window.lastGif) {
        return await generateRandomItem();
      }
      window.lastGif = gifUrl;
      return {
        type: "gif",
        content: gifUrl
      };
    } catch (error) {
      console.error("GIF fetch failed:", error);
      return {
        type: "text",
        content: "GIF evrenine bağlanılamadı. :("
      };
    }
  } else {
    const texts = [
      "Zaman bir illüzyon. Verimlilik de öyle.",
      "Belki tembel değilsin, belki dünya fazla gürültülü.",
      "Boşluğa bakmak geçerli bir aktivitedir. 🕳️",
      "Hiçbir şey yapmamak sessiz bir başkaldırıdır.",
      "Geride değilsin. Sadece kendi garip zaman çizelgeni üzerindesin. 🌀",
      "Bugün sadece var olmak yeterli.",
      "Tuhaf hissediyorsan, harika.",
      "Gerçeklik aradı. Açmadım. 📞",
      "Varoluşsal hattı aradınız. Lütfen bekleyin... ☎️",
      "Uyku benim başa çıkma yöntemimdir.",
      "Hiçbir şey önemli değil ama en azından tatlıyım.",
      "Mod: yükleniyor sembolü.",
      "'Meh' dönemimdeyim.",
      "Sorma. Anlatmam.",
      "Düşünce yok. Sadece parazit.",
      "404: Motivasyon bulunamadı.",
      "Bazı günler sadece var olurum. Bugün onlardan biri.",
      "Antisosyal değilim, saçmalığa karşıyım.",
      "Profesyonelce bunaldım.",
      "Varoluşsal süreçle lütfen meşgul etmeyin.",
      "Beynim ofis dışında.",
      "Duygusal olarak tampon modundayım...",
      "Mental olarak düşük pil seviyesinde.",
      "Aşırı uyarılmış ve yetersiz etkilenmiş.",
      "Seni görmezden gelmiyorum. Her şeyi görmezden geliyorum.",
      "Varoluşsal kriz ama sevimli.",
      "Şu anda zihinsel olarak burada değilim.",
      "Bugünün modu: minimum etkileşim.",
      "Bir kere göz teması kurdum. Bir daha asla.",
      "Elimden geleni yapıyorum. İşte gönderi bu.",
      "Beni yeniden başlatma.",
      "Boşlukta süzülmek planım.",
      "Varoluş bir aksaklık.",
      "Beni düzeltme. Ben titreşiyorum.",
      "Otomatik yanıt: duygusal olarak mevcut değilim.",
      "Varoluşu ertelemekle meşgulüm.",
      "Buradayım ama ağlamamak için.",
      "Sessizlik şu anki ayarım.",
      "Uyku modundayım. Uyandırma.",
      "Lütfen bekle. Hayat yükleniyor...",
      "Bana ihtiyacın varsa zihinsel olarak başka yerdeyim.",
      "Sorularla doluyum, cevaplarla boşum.",
      "Hayat güncellemesi: tampon mod...",
      "Duygusal olarak çevrimdışı.",
      "Titreşimler tuhaf. Ben daha da tuhafım.",
      "Yeni bir duyuruya kadar grevdeyim.",
      "Çabalamayı denedim. Olmadı. Bir daha denemek bedava!",
      "Başka bir zaman çizelgesinde umursuyorum. Bu değil.",
      "Huzuru indirdim. Yükleniyor...",
      "Nefes almayı fazla düşünmemeye çalışıyorum.",
      "Yaşıyorum. Gülüyorum. Gidiyorum.",
      "Bugün %90 'meh' hissediyorum.",
      "Beep boop, şu an üzgünüm.",
      "Etkileşme. Düşük güç modu.",
      "Tam zamanlı boşluk sörfçüsüyüm.",
      "Hayır. Sadece hayır.",
      "Boşlukla çok yakınlaştık.",
      "Sistem hatası: yapamıyorum. Yeniden başlatıyorum. 🙃",
      "Bozuk ama havalı.",
      "Titreşimler post-apokaliptik.",
      "Şu an değil, bunalımdayım. Ama birazdan belki?",
      "Önemsiz şeylerle meşgulüm. Ama keyifliyim.",
      "Kozmik ilgisizlik artıyor. Belki de bu bir süper güç.",
      "Hiçbir şey gerçek değil ve her şey bir ruh hali. Yani özgürüm.",
      "Kafam karışık uyandım. Ama kahve var.",
      "Sadece sarılmalar ve şekerlemeler kabul ediyorum. Ve belki pizza.",
      "Minimum işlev. Maksimum his. Bonus: stil.",
      "Sıfır üretkenlik. Tam estetik. Çünkü sanat!",
      "Meh² ama yaratıcı.",
      "Boşlukta sörf underrated. Tavsiye ederim.",
      "Bir soru işareti olarak tanımlanıyorum. En azından özgünüm.",
      "Felsefi bir su birikintisiyim. Üstelik parıltılı.",
      "Hırsım yıllık izinde. Ben de birazdan giderim.",
      "Şu anda varoluşsal endişeyle titreşiyorum. Lo-fi eşliğinde.",
      "Pijamaları bir yaşam biçimi olarak giyiyorum. Ve gurur duyuyorum.",
      "Bugün var olmak opsiyonel. Ama kahvaltı zorunlu.",
      "Bugünün kıyafeti: görünmez. Ama parlıyorum içten içe.",
      "Profesyonel içe dönüklük. Sessiz ama derin.",
      "Kozmik bağlantı kesildi. Modemi yeniden başlatıyorum.",
      "Aşırı düşünüyorum. Lütfen bekle. Çözüm geliyor.",
      "Zihinsel olarak kıvrıldım. Yoga değilse de benzer.",
      "Bir kaya olmak istiyorum. Stabil, güçlü, yuvarlanmayan.",
      "Sertifikalı ruh hali: ... (ama glitterlı)",
      "Bir bulut olmak isterdim. Sürekli gezmek için.",
      "Programımı sil lütfen. Yeniden başlamak istiyorum.",
      "Düşüncesiz yüz ifadesi. Sürprizlere açık.",
      "Üzgünüm ama estetik bir şekilde. Galeride sergilenebilir.",
      "Konforlu bir uyuşukluk içindeyim. Tavsiye ederim.",
      "Tam zamanlı hayalperest. Part-time umutlu.",
      "Düşük ses. Düşük enerji. Düşük beklenti. Maksimum huzur.",
      "Elimden geleni yapıyorum. Oldukça ortalama. Ama içten.",
      "Bir şeyler yapmaktan emekli oldum. Huzurluyum.",
      "Hayatta sürükleniyorum, 'eh' gibi. Ama gülümsüyorum.",
      "Beynim balık tutmaya gitti. Umarım döner.",
      "Saat 4’te planlı hüzün. Ama sonra dondurma var.",
      "Kaybolmuş gibi bir melankoli. Haritada kalp var.",
      "Zihinsel olarak grup sohbetinden ayrıldım. Ama geri dönebilirim.",
      "Şu anda duygusal olarak tampon moddayım... şarj ediliyor.",
      "Ruh hali: tanımsız. Ama merak uyandırıcı.",
      "Beni yumuşak ve garip olmama izin ver. Çünkü böyle iyiyim."
    ];
    return {
      type: "text",
      content: (() => {
        let next;
        do {
          next = Math.floor(Math.random() * texts.length);
        } while (texts[next] === window.lastText);
        window.lastText = texts[next];
        return texts[next];
      })()
    };
  }
}

export default generateRandomItem;

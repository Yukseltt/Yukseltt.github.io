# AI Tasarım Kuralları

## Amaç

Bu doküman, bir web sayfası veya dijital ürün arayüzü tasarlanırken yapay zekânın klişe, birbirine benzeyen ve jenerik görsel çözümlere yönelmesini engellemek için kullanılacak tasarım kurallarını tanımlar.

Temel yaklaşım: **Önce art direction, sonra tasarım, en son kod.**

---

## 1. Tasarım Öncesi 5 Karar

Kod yazmaya başlamadan önce aşağıdaki 5 karar **tam olarak 5 satırda** verilmelidir:

1. **Ürün ve kullanıcı:** Ürün kime hitap ediyor ve hangi tek işi çözüyor?
2. **Görsel referans:** Tasarım hangi disiplin veya görsel kültürden referans alıyor? Örnek: editorial design, endüstriyel tasarım, mimari, yayıncılık, sinema, finansal arayüzler vb. **"Modern SaaS" kullanılamaz.**
3. **Yapısal fikir:** Sayfayı rakiplerinden ayıran ve kolayca taklit edilemeyen tek yapısal fikir nedir?
4. **Tipografi:** İki font seçilmelidir. **Inter, Geist, Space Grotesk ve Poppins yasaktır.**
5. **Renk sistemi:** Bir ana renk ve bir nötr renk ailesi seçilmelidir. **Mor-siyah kombinasyonu, gradient ve neon yasaktır.**

Bu beş karar verilmeden arayüz kodlanmamalıdır.

---

## 2. Yasaklı Tasarım Kalıpları

Aşağıdaki unsurlar tasarımda kullanılmamalıdır:

- Sert gradient
- Lucide ikonları
- Bembeyaz arka plan
- Her elemente gölge vermek
- Yan yana üç kart düzeni
- Emoji
- Buzlu cam / glassmorphism
- Uzun tire
- Bento grid
- Süs amaçlı terminal / kod pencereleri
- `"X değil Y"` kalıbı
- Tik işaretli liste
- Üçlü fiyatlandırma tablosu
- Aşırı yuvarlatılmış köşeler
- Bulanık ışık lekeleri
- Noktalı arka plan
- Parıltı / sparkle ikonu
- Neon renkler
- Klişe pastel renk paletleri

### Tasarım İlkesi

Bir tasarım, yukarıdaki öğelerin birkaçını kaldırarak değil, **başlangıçta bunlara ihtiyaç duymayacak bir görsel sistem kurarak** özgün olmalıdır.

---

## 3. Zorunlu İçerikler

Her tasarım aşağıdaki unsurları içermelidir:

### 3.1 Ürünün Gerçek Görüntüsü

Ürün gerçekten bir arayüze, cihaza, fiziksel ürüne veya görsel çıktıya sahipse bunun gerçek görüntüsü kullanılmalıdır.

Placeholder, anlamsız mockup veya sırf alan doldurmak için oluşturulmuş sahte görseller kullanılmamalıdır.

### 3.2 Somut Metin

Genel ve soyut pazarlama cümleleri yerine somut bilgiler kullanılmalıdır.

Örnek:

- Sayılar
- İsimler
- Tarihler
- Gerçek özellikler
- Gerçek ölçümler
- Gerçek ürün adları
- Gerçek kullanım senaryoları

Metin, ürünün ne yaptığını anlaşılır biçimde göstermelidir.

### 3.3 Şartlar ve Gizlilik

Sayfada uygun bir konumda:

- Şartlar / Kullanım Koşulları bağlantısı
- Gizlilik bağlantısı

bulunmalıdır.

### 3.4 Tek Köşe Yarıçapı

Tasarım boyunca **tek bir border-radius değeri** kullanılmalıdır.

Örneğin:

```css
--radius: 12px;
```

Kart, buton, input, modal ve diğer arayüz elemanlarında farklı radius değerleri kullanılmamalıdır.

Amaç, görsel sistemde tutarlılık sağlamaktır.

---

## 4. Art Direction

Tasarımcı gibi değil, **art director gibi karar verilmelidir.**

Öncelik sırası:

1. Ürün
2. Kullanıcı
3. Görsel referans
4. Yapısal fikir
5. Tipografi
6. Renk sistemi
7. İçerik hiyerarşisi
8. Layout
9. UI detayları
10. Kod

Kod, tasarım kararlarının yerine geçmemelidir.

---

## 5. Görsel Referans Kuralı

Tasarım için belirli bir görsel disiplin seçilmelidir.

### Kullanılabilecek referans alanları

- Editorial / dergi tasarımı
- Mimari
- Endüstriyel tasarım
- İsviçre grafik tasarımı
- Film jenerikleri
- Haritacılık
- Finansal yayıncılık
- Teknik kataloglar
- Müzik albümü tasarımı
- Moda yayıncılığı
- Müze / galeri kimlikleri
- Bilimsel yayınlar
- Ambalaj tasarımı
- Tipografik poster tasarımı

### Kaçınılması gereken referans

**"Modern SaaS"** tek başına görsel referans olarak kullanılamaz.

Çünkü bu ifade çoğunlukla birbirine benzeyen:

- büyük hero başlıkları
- gradient arka planlar
- yuvarlak kartlar
- dashboard mockupları
- pastel renkler
- glow efektleri

üreten jenerik bir tasarım diline dönüşür.

---

## 6. Yapısal Özgünlük Testi

Sayfanın en az bir tane güçlü yapısal fikri olmalıdır.

Bu fikir yalnızca renk, font veya ikon değiştirerek elde edilmemelidir.

### Örnek yapısal fikirler

- İçeriği zamansal bir akış üzerinden düzenlemek
- Ürünü ana navigasyonun içine fiziksel olarak yerleştirmek
- Büyük bir görseli sayfanın gridini belirleyen ana yapısal öğe yapmak
- İçeriği bir katalog / indeks mantığında sunmak
- Sayfayı tek bir sürekli kompozisyon olarak tasarlamak
- Veriyi tipografik hiyerarşinin ana taşıyıcısı yapmak

Amaç, sayfanın **layout mantığının** markanın veya ürünün karakteriyle ilişkilendirilmesidir.

---

## 7. Tipografi Kuralları

İki font seçilmelidir:

- Birincil font
- İkincil font

### Yasaklı fontlar

- Inter
- Geist
- Space Grotesk
- Poppins

Tipografi seçiminde fontun yalnızca "güzel" olması yeterli değildir.

Font seçimi:

- ürünün karakteri
- seçilen görsel disiplin
- bilgi yoğunluğu
- okunabilirlik
- marka algısı

ile ilişkili olmalıdır.

---

## 8. Renk Kuralları

Renk sistemi:

**1 ana renk + 1 nötr renk ailesi**

üzerine kurulmalıdır.

### Yasaklı

- Mor + siyah kombinasyonu
- Gradient
- Neon renkler
- Klişe pastel paletler
- Glow efektleri

Renk, dekorasyon amacıyla değil **hiyerarşi ve anlam oluşturmak** için kullanılmalıdır.

---

## 9. Görsel Gürültüyü Engelleme

Aşağıdaki sorular tasarım sırasında sürekli kontrol edilmelidir:

- Bu element gerçekten gerekli mi?
- Bu ikon bilgi taşıyor mu?
- Bu gölge derinlik sağlıyor mu, yoksa alışkanlıktan mı eklendi?
- Bu radius sistemin parçası mı?
- Bu renk bir anlam taşıyor mu?
- Bu görsel ürün hakkında bilgi veriyor mu?
- Bu alan gerçekten boşluk olarak mı gerekli?
- Bu dekorasyon tasarımı güçlendiriyor mu?

Cevap "hayır" ise element kaldırılmalıdır.

---

## 10. İçerik Kuralları

### Soyut metin yerine somut bilgi

Kullanılmaması gereken yaklaşım:

> "İşlerinizi daha hızlı ve kolay hale getirin."

Tercih edilmesi gereken yaklaşım:

> "Son 30 günde 184 işlem tamamlandı."

İçerik mümkün olduğunca gerçek:

- sayı
- isim
- tarih
- durum
- ölçüm
- ürün
- kullanıcı aksiyonu

üzerinden kurulmalıdır.

---

## 11. Marka Bağımlılığı Testi

Sayfa tasarımı yalnızca marka adına güvenmemelidir.

### Test

**Marka adını sayfadan kaldır.**

Sonrasında şu soru sorulur:

> "Bu ürünün ne olduğu hâlâ anlaşılabiliyor mu?"

Cevap hayır ise tasarım yeniden ele alınmalıdır.

Ürünün:

- görsel dili
- içerik yapısı
- bilgi hiyerarşisi
- ürün görüntüsü
- yapısal fikri

ne yaptığı hakkında yeterli ipucu vermelidir.

---

## 12. Siyah Blok Testi

Sayfanın tüm renklerini ve içerik detaylarını kaldırıp yalnızca siyah bloklardan oluşan bir kompozisyon olarak düşünün.

### Soru

> "Bu siyah bloklara indirgenmiş hâliyle sayfa rakiplerinden ayrılıyor mu?"

Eğer cevap **hayır** ise:

**Tasarımı yayınlama. Baştan tasarla.**

Bu test özellikle layout'un gerçekten özgün olup olmadığını kontrol etmek için kullanılır.

---

## 13. Son Kontrol

Tasarım teslim edilmeden önce aşağıdaki kontroller yapılmalıdır:

- [ ] Ürün kime ve ne yaptığı anlaşılabiliyor mu?
- [ ] Görsel referans belirli bir disipline dayanıyor mu?
- [ ] "Modern SaaS" referans olarak kullanılmadı mı?
- [ ] Tek ve güçlü bir yapısal fikir var mı?
- [ ] Tam olarak iki font seçildi mi?
- [ ] Inter kullanılmadı mı?
- [ ] Geist kullanılmadı mı?
- [ ] Space Grotesk kullanılmadı mı?
- [ ] Poppins kullanılmadı mı?
- [ ] Bir ana renk + nötr aile kullanıldı mı?
- [ ] Gradient kullanılmadı mı?
- [ ] Neon kullanılmadı mı?
- [ ] Mor-siyah kombinasyonu kullanılmadı mı?
- [ ] Lucide ikonları kullanılmadı mı?
- [ ] Emoji kullanılmadı mı?
- [ ] Glassmorphism kullanılmadı mı?
- [ ] Bento grid kullanılmadı mı?
- [ ] Üçlü kart düzeni kullanılmadı mı?
- [ ] Üçlü fiyat tablosu kullanılmadı mı?
- [ ] Her elemente gölge verilmedi mi?
- [ ] Aşırı yuvarlak köşeler kullanılmadı mı?
- [ ] Tek bir border-radius değeri kullanıldı mı?
- [ ] Gerçek ürün görüntüsü var mı?
- [ ] Somut metin, sayı, isim veya tarih var mı?
- [ ] Şartlar bağlantısı var mı?
- [ ] Gizlilik bağlantısı var mı?
- [ ] Marka adı kaldırıldığında ürün anlaşılabiliyor mu?
- [ ] Siyah blok testinden geçiyor mu?

---

## 14. Tasarım Karar Şablonu

Kodlamadan önce şu format kullanılmalıdır:

```text
Ürün / Kullanıcı: [Ürün kime hitap ediyor + tek işi]

Görsel Referans: [Disiplin / tasarım kültürü]

Yapısal Fikir: [Sayfayı rakiplerden ayıran tek yapısal fikir]

Tipografi: [Font 1] + [Font 2]

Renk: [Ana renk] + [Nötr renk ailesi]
```

Bu bölüm tamamlanmadan kod yazılmamalıdır.

---

## 15. Nihai Tasarım Prensibi

**Jenerik bir arayüzü farklı göstermek yerine, başlangıçtan itibaren jenerik olmayan bir sistem tasarla.**

Tasarım:

- trendleri kopyalamamalı,
- dekorasyonla özgün görünmeye çalışmamalı,
- ürünün karakterinden türemeli,
- somut içerik kullanmalı,
- güçlü bir yapısal fikre sahip olmalı,
- tipografi ve renkleri bilinçli kullanmalı,
- gereksiz UI kalıplarını reddetmeli.

Son karar:

> **Siyah blok testinden veya marka silme testinden geçemeyen tasarım yeniden yapılmalıdır.**

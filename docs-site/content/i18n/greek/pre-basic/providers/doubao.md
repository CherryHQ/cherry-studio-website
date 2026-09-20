
{% hint style="warning" %}
Αυτό το έγγραφο μεταφράστηκε από τα Κινεζικά με AI και δεν έχει ακόμη ελεγχθεί.
{% endhint %}

# ByteDance (Doubao)

* Συνδεθείτε στο [Volcano Engine](https://console.volcengine.com/)
* Κάντε απευθείας κλικ [εδώ για άμεση πρόσβαση](https://console.volcengine.com/ark/region:ark+cn-beijing/openManagement?LLM=%7B%7D)

<figure><img src="../../../../assets/748f7813cf1fde645a968c13.webp" alt=""><figcaption></figcaption></figure>

### Λήψη κλειδιού API

* Κάντε κλικ στη [Διαχείριση κλειδιού API](https://console.volcengine.com/ark/region:ark+cn-beijing/apiKey) στην πλευρική γραμμή
* Δημιουργήστε ένα κλειδί API

<figure><img src="../../../../assets/565501695d6ec77af56b0d94.webp" alt=""><figcaption></figcaption></figure>

* Μετά την επιτυχή δημιουργία, κάντε κλικ στο μικρό εικονίδιο ματιού δίπλα στο κλειδί API για να το εμφανίσετε και να το αντιγράψετε

<figure><img src="../../../../assets/abead8dd3efc80aa8dfe9b88.webp" alt=""><figcaption></figcaption></figure>

* Επικολλήστε το κλειδί API στο CherryStudio και ενεργοποιήστε τον διακόπτη του παρόχου

<figure><img src="../../../../assets/fec7f5e64d98a659fa27ff9c.webp" alt=""><figcaption></figcaption></figure>

### Ενεργοποίηση και προσθήκη μοντέλων

* Στην πλευρική γραμμή της κονσόλας Ark, ενεργοποιήστε τα απαραίτητα μοντέλα μέσω της [Διαχείρισης ενεργοποίησης](https://console.volcengine.com/ark/region:ark+cn-beijing/openManagement?LLM=%7B%7D\&OpenTokenDrawer=false). Μπορείτε να ενεργοποιήσετε τη σειρά Doubao και μοντέλα όπως το DeepSeek ανάλογα με τις ανάγκες σας.

<figure><img src="../../../../assets/b921f99f2e21714c0ef9cafb.webp" alt=""><figcaption></figcaption></figure>

* Στο [έγγραφο λίστας μοντέλων](https://www.volcengine.com/docs/82379/1330310#%E6%96%87%E6%9C%AC%E7%94%9F%E6%88%90), βρείτε το αναγνωριστικό μοντέλου (Model ID) που αντιστοιχεί στο επιθυμητό μοντέλο.

<figure><img src="../../../../assets/cba9e28d82aef11147fc01c6.webp" alt="Παράδειγμα λίστας αναγνωριστικών μοντέλων του Volcano Engine"><figcaption></figcaption></figure>

* Στο Cherry Studio, μεταβείτε στις ρυθμίσεις [Υπηρεσιών μοντέλων](../../cherrystudio/preview/settings/providers.md) και επιλέξτε Volcano Engine
* Κάντε κλικ στην "Προσθήκη" και επικολλήστε το αναγνωριστικό μοντέλου στο πεδίο κειμένου

<figure><img src="../../../../assets/70c3827ffb29455676fb2fb0.webp" alt=""><figcaption></figcaption></figure>

* Προσθέστε τα μοντέλα ένα προς ένα ακολουθώντας αυτή τη διαδικασία

### Διεύθυνση API

Οι διευθύνσεις API μπορούν να γραφτούν με δύο τρόπους:

* Ο πρώτος (προεπιλεγμένος στον πελάτη): `https://ark.cn-beijing.volces.com/api/v3/`
* Ο δεύτερος: `https://ark.cn-beijing.volces.com/api/v3/chat/completions#`

{% hint style="info" %}
Δεν υπάρχει σημαντική διαφορά μεταξύ των δύο μορφών. Μπορείτε να διατηρήσετε την προεπιλεγμένη χωρίς αλλαγές.

Για διαφορές στο τέλος μεταξύ `/` και `#`, ανατρέξτε στην ενότητα ρυθμίσεων API του παρόχου: [Επισκεφθείτε την ενότητα](../../cherrystudio/preview/settings/providers.md#api-di-zhi)
{% endhint %}

<figure><img src="../../../../assets/91ce519c471ef98b7840a33e.webp" alt=""><figcaption><p>Παράδειγμα cURL από το επίσημο έγγραφο</p></figcaption></figure>
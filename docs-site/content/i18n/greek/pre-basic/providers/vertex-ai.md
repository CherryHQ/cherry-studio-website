---
description: 暂时不支持Claude模型
---
# Vertex AI


{% hint style="warning" %}
Αυτό το έγγραφο μεταφράστηκε από τα Κινεζικά με AI και δεν έχει ακόμη ελεγχθεί.
{% endhint %}




## Επισκόπηση του μαθήματος

### 1. Λήψη κλειδιού API

* Πριν λάβετε το κλειδί API για το Gemini, χρειάζεστε ένα έργο Google Cloud (αν έχετε ήδη, παραλείψτε αυτό το βήμα)
* Μεταβείτε στο [Google Cloud](https://console.cloud.google.com/projectcreate) για να δημιουργήσετε έργο, συμπληρώστε το όνομα έργου και κάντε κλικ στο "Δημιουργία έργου"

<figure><img src="../../../../assets/8f9c0115bb319f382af9a285.webp" alt=""><figcaption></figcaption></figure>

* Εισέλθετε στον [Πίνακα ελέγχου Vertex AI](https://console.cloud.google.com/vertex-ai)
* Ενεργοποιήστε το [Vertex AI API](https://console.cloud.google.com/apis/library/aiplatform.googleapis.com?inv=1\&invt=Ab0iBA) στο δημιουργηθέν έργο

<figure><img src="../../../../assets/96e82ac0955b37a74db6b69a.webp" alt=""><figcaption></figcaption></figure>

## 2. Ρύθμιση δικαιωμάτων πρόσβασης API

* Ανοίξτε τη σελίδα δικαιωμάτων [λογαριασμών υπηρεσιών](https://console.cloud.google.com/iam-admin/serviceaccounts) και δημιουργήστε έναν λογαριασμό υπηρεσίας

<figure><img src="../../../../assets/30f5231c6907a019ae7b9250.webp" alt=""><figcaption></figcaption></figure>

* Στη σελίδα διαχείρισης λογαριασμών υπηρεσιών, βρείτε τον νεοδημιουργηθέντα λογαριασμό, κάντε κλικ στο `Κλειδιά` και δημιουργήστε ένα νέο κλειδί σε μορφή JSON

<figure><img src="../../../../assets/d320ae7c346ac2b623a4a8ef.webp" alt=""><figcaption></figcaption></figure>

* Μετά την επιτυχή δημιουργία, το αρχείο κλειδιού θα αποθηκευτεί αυτόματα στον υπολογιστή σας σε μορφή JSON - **φυλάξτε το με ασφάλεια**

## 3. Διαμόρφωση του Vertex AI στο Cherry Studio

* Επιλέξτε τον πάροχο υπηρεσιών Vertex AI
* Συμπληρώστε τα αντίστοιχα πεδία από το αρχείο JSON

<figure><img src="../../../../assets/7e6fa74e4cec7ed09526cc60.webp" alt=""><figcaption></figcaption></figure>

Κάντε κλικ στην προσθήκη [μοντέλου](https://console.cloud.google.com/vertex-ai/model-garden) και είστε έτοιμοι να ξεκινήσετε!
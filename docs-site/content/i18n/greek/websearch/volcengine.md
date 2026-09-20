---
description: cherry studio使用「火山引擎」接入deepseekR1联网功能，喂饭教程。
hidden: True
icon: globe-pointer
---

{% hint style="warning" %}
Αυτό το έγγραφο μεταφράστηκε από τα Κινεζικά με AI και δεν έχει ακόμη ελεγχθεί.
{% endhint %}

# Πρόσβαση στο Διαδίκτυο μέσω του Volcano Engine

### 1. Σύνδεση/Εγγραφή λογαριασμού «Volcano Engine» <a href="#rclz7" id="rclz7"></a>

Επίσκεψη στην επίσημη ιστοσελίδα: [https://www.volcengine.com/](https://www.volcengine.com/)

<figure><img src="../../../assets/98bfb5c300d7cd815aedf4c7.webp" alt=""><figcaption><p>Επίσημη ιστοσελίδα Volcano Engine</p></figcaption></figure>

### 2. Δημιουργία «Δικής μου Εφαρμογής» «με πρόσβαση στο διαδίκτυο» <a href="#gvzaa" id="gvzaa"></a>

2.1. Συνδεθείτε στο Volcano Engine και μεταβείτε στη σελίδα «Volcano Ark»: [https://console.volcengine.com/ark](https://console.volcengine.com/ark)

2.2. **Κάντε κλικ διαδοχικά:**<mark style="color:red;">**«Δικές μου Εφαρμογές» - «Δημιουργία Εφαρμογής» - «Χωρίς κώδικα» - «Ατομική συνομιλία»**</mark> &#x20;

<figure><img src="../../../assets/ee60f999a4dccbbdce8881e5.webp" alt=""><figcaption></figcaption></figure>

<figure><img src="../../../assets/fec0d788d8d23f729247d79d.webp" alt=""><figcaption></figcaption></figure>

<figure><img src="../../../assets/9e4bb430ed758a3ffe559a59.webp" alt=""><figcaption></figcaption></figure>

### 3. Συμπλήρωση πληροφοριών και δημοσίευση εφαρμογής <a href="#zzdfe" id="zzdfe"></a>

**Όνομα εφαρμογής**: Ονομασία ελεύθερη επιλογής σύμφωνα με τις απαιτήσεις (τα πεδία με<mark style="color:red;">**\* είναι υποχρεωτικά**</mark>, τα υπόλοιπα προαιρετικά)

<mark style="color:red;">**Κρίσιμο σημείο: Ενεργοποίηση πρόσβασης στο διαδίκτυο (πρέπει πρώτα να ενεργοποιηθεί)**</mark>

<figure><img src="../../../assets/5235ef3b0757059a7fd00447.webp" alt=""><figcaption></figcaption></figure>

#### 3.1. Ενεργοποίηση πρόσβασης στο διαδίκτυο (προσοχή στα κόστη και δωρεάν χρήσεις) <a href="#mwn38" id="mwn38"></a>

<figure><img src="../../../assets/c4170cccee5de8c993b0b586.webp" alt=""><figcaption><p>Κάντε κλικ στο «Άμεση αγορά» και ακολουθήστε τα βήματα μέχρι την εμφάνιση της παρακάτω οθόνης για επιβεβαίωση ενεργοποίησης.</p></figcaption></figure>

<figure><img src="../../../assets/2d729a056d0bd71aa627b48a.webp" alt=""><figcaption><p>Επαληθεύστε την κατάσταση - ενεργοποίηση ολοκληρώθηκε</p></figcaption></figure>

Επιστρέψτε στη σελίδα «Συμπλήρωση πληροφοριών εφαρμογής» για συνέχεια.

<figure><img src="../../../assets/47360c539ee128f39b86020c.webp" alt=""><figcaption></figcaption></figure>

#### 3.2. Ρυθμίσεις «Πρόσβασης στο διαδίκτυο» για προχωρημένους <a href="#sp6uz" id="sp6uz"></a>

Προτάσεις ρύθμισης:
* Για έλεγχο εισόδου/εξόδου: χρησιμοποιήστε «**Προσαρμοσμένη πρόσβαση**»
* Για απλούστερο setup: «**Αυτόματη πρόσβαση**» (προεπιλογή)
* Για υψηλή χρονική ακρίβεια: «**Υποχρεωτική ενεργοποίηση**»

<figure><img src="../../../assets/e886e47fc99c10deaf5e80e3.webp" alt=""><figcaption></figcaption></figure>

#### 3.3. Δημοσίευση εφαρμογής <a href="#fe1gf" id="fe1gf"></a>

Κάντε κλικ στο κουμπί «Δημοσίευση» για επιτυχή δημιουργία εφαρμογής.

<figure><img src="../../../assets/09b6fa788839c08e605d9128.webp" alt=""><figcaption></figcaption></figure>

### 4. Λήψη API Key <a href="#jtqlu" id="jtqlu"></a>

Κάντε κλικ διαδοχικά: **«Οδηγός API» - «Επιλογή API Key» - «Αντιγραφή»**

Αντιγράψτε το API key και επικολλήστε το στο Cherry Studio (ακολουθήστε τα βήματα):

<figure><img src="../../../assets/8322870a4161de7ff5d860f5.webp" alt=""><figcaption></figcaption></figure>

Σημείωση: Εάν δεν υπάρχει API key, κάντε κλικ στο «**Δημιουργία API Key**» πριν την αντιγραφή.

<figure><img src="../../../assets/9100d8ab913d8976f53cd0c7.webp" alt=""><figcaption></figcaption></figure>

### 5. Χρήση API Key στο Cherry Studio για πρόσβαση στο διαδίκτυο μέσω deepseek-R1 <a href="#lrefj" id="lrefj"></a>

#### 5.1. Ανοίξτε το Cherry Studio - «Ρυθμίσεις» - «Οποιοδήποτε όνομα» - «Τύπος: openAI» <a href="#dvrbv" id="dvrbv"></a>

<figure><img src="../../../assets/6b84bd9cf3e91737c3b3a7a3.webp" alt="" width="375"><figcaption></figcaption></figure>

<figure><img src="../../../assets/dacbd055825146aa4031a7e7.webp" alt="" width="375"><figcaption></figcaption></figure>

#### 5.2. Ρύθμιση URL και κλειδιού <a href="#mt8y0" id="mt8y0"></a>

<figure><img src="../../../assets/d85bb2796ec18d77b27164e3.webp" alt=""><figcaption></figcaption></figure>

<mark style="color:purple;">Προσοχή: Οι διευθύνσεις Beijing node πρέπει να περιέχουν "/" στο τέλος:</mark>

<figure><img src="../../../assets/ef3bcae1b0f5e786077b2373.webp" alt=""><figcaption></figcaption></figure>

#### 5.3. Προσθήκη ονόματος μοντέλου <a href="#qmh3i" id="qmh3i"></a>

Αντιγράψτε το όνομα μοντέλου από τη μικρή ένδειξη για αποφυγή σφαλμάτων.

<figure><img src="../../../assets/53b0e97b6a0b9680e673974e.webp" alt=""><figcaption></figcaption></figure>

<figure><img src="../../../assets/7a43cd735df850805b24394c.webp" alt=""><figcaption></figcaption></figure>

### 6. Προεπισκόπηση αποτελέσματος <a href="#peb2p" id="peb2p"></a>

<figure><img src="../../../assets/769e08e7462e840976de738b.webp" alt=""><figcaption></figcaption></figure>
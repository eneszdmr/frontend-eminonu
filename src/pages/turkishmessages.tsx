
const turkishMessages: TranslationMessages = {
    ra: {
        message: {
            invalid_form: "Hatalı Form Bilgileri",
            access_denied: "Yetkisiz Erişim !",
            delete_title: "Silmek istediğinize emin misiniz ?",
            delete_content: "Bu işlem geri alınamaz.",
        },
        input: {
            file: {
                upload_single: "Dosya yükleyin",
                upload_several: "Birden fazla dosya yükleyebilirsiniz",
            },
            password: {
                toggle_hidden: "Parolayı Gizle",
                toggle_visible: "Parolayı Göster",
            },
            image: {
                upload_several: "Birden fazla dosya yükleyebilirsiniz",
                upload_single: "Tek bir dosya yükleyin",
            },
        },
        sort: {
            ASC: "sırala",
            DESC: "ters sılara",
        },
        action: {
            add: "Ekle",
            delete: "Sil",
            show: "Göster",
            edit: "Düzenle",
            cancel: "İptal",
            save: "Kaydet",
            create: "Oluştur",
            unselect: "Seçimi Kaldır",
            export: "Excel'e Çıkar",
            logout: "Çıkış",
            sort: "sırala",
            bulk_actions: "seçildi",
            undo: "Geri Al",
            clear_input_value: "Temizle",
            confirm: "Onayla",
            refresh: "Yenile",
        },
        auth: {
            sign_in: "Giriş Yap",
            sign_out: "Çıkış Yap",
            username: "E-posta adresi",
            password: "Parola",
        },
        notification: {
            created: "Başarıyla oluşturuldu",
            deleted: "Başarıyla silindi",
            updated: "Başarıyla güncellendi",
            data_provider_error: "Veri bulunamadı",
            item_doesnt_exist: "Ürün yerinde yok",
        },
        navigation: {
            no_results: "Sonuç bulunamadı",
            page_out_of_boundaries: "Sayfa sınırların dışında",
            page_out_from_end: "Sayfa sonundan fazla",
            page_out_from_begin: "Sayfa başından fazla",
            page_range_info: "%{offsetBegin} - %{offsetEnd} / %{total}",
            next: "İleri",
            prev: "Geri",
            page_rows_per_page: "Sayfa başına satır:",
        },
        page: {
            list: "Liste",
            edit: "Düzenle %{name}",
            show: "Göster %{name}",
            create: "Oluştur %{name}",
            dashboard: "Kontrol Paneli",
            not_found: "Sayfa bulunamadı",
            empty: "Henüz kayıt bulunmamaktadır.",  // ✅ Fix for "ra.page.empty"
            invite: "Yeni bir kayıt ekleyerek başlayabilirsiniz.",  // ✅ Fix for "ra.page.invite"
            access_denied:"Yetkisiz Erişim !",
        },
        configurable: {
            customize: "Özelleştir",  // ✅ Fix for "ra.configurable.customize"
        },
        validation: {
            required:"Zorunlu Alan",
        },
    },
    resources: {
        companies: {
            name: "Firmalar",
            fields: {
                id:"Firma Kodu",
                name: "Firma Adı",
                address: "Adres",
                phone: "Telefon",
            },
        },
        users: {
            name: "Kullanıcılar",
            fields: {
                email: "E-Posta",
                role: "Rol",
            },
        },
        categories: {
            name: "Kategoriler",
            fields: {
                name: "Kategori Adı",
            },
        },
        comments: {
            name: "Yorumlar",
            fields: {
                body: "Yorum",
            },
        },
        products: {
            name: "Ürünler",
            fields: {
                body: "Ürün",
            },
        },
        sliders: {
            slider_updated: "Slider başarıyla güncellendi",
        },
    },
};

export default turkishMessages;

import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

export interface Locale {
	lang: string;
	data: Object;
}

@Injectable({
	providedIn: 'root'
})
export class TranslationService {
	private langIds: any = [];

	constructor(private translate: TranslateService) {
		// add new langIds to the list
		this.translate.addLangs(['en']);

		// this language will be used as a fallback when a translation isn't found in the current language
		this.translate.setDefaultLang('en');
	}

	public loadTranslations(...args: Locale[]): void {
		const locales = [...args];

		locales.forEach(locale => {
			// use setTranslation() with the third argument set to true
			// to append translations instead of replacing them
			this.translate.setTranslation(locale.lang, locale.data, true);

			this.langIds.push(locale.lang);
		});

		// add new languages to the list
		this.translate.addLangs(this.langIds);
	}

	setLanguage(lang) {
		if (lang) {
			this.translate.use(this.translate.getDefaultLang());
			this.translate.use(lang);
			localStorage.setItem('language', lang);
		}
	}

	public getSelectedLanguage(): Observable<any> {
		return of(localStorage.getItem('language') || this.translate.getDefaultLang());
	}
}

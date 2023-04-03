import axios from 'axios';
import { load } from 'cheerio';
interface IArticle {
    headline: string;
    url?: string;
    author: string;
    location: string;
    paragraph: string;
}
const scrapeElPaisNews = async () => {
    const response = await axios.get('https://elpais.com/');
    const $ = load(response.data);
    const articles: object[] = [];
    $('.mw .c').each((index, element) => {
        if (articles.length < 5) {
            const headline = $(element).find('.c_h .c_t').text().trim();
            const url = $(element).find('.c_h a').attr('href');
            const author = $(element).find('.c_a_a').text().trim();
            const location = $(element).find('.c_a_l').text().trim();
            const paragraph = $(element).find('.c_d').text().trim();
            const articleObj: IArticle = { headline, url, author, location, paragraph };
            articles.push(articleObj);
        }
    });

    return articles
}

const scrapeElMundoNews = async () => {
    const response = await axios.get('https://elmundo.es/');
    const $ = load(response.data);
    const articles: object[] = [];

    $('.ue-c-cover-content').each((index, element) => {
        if (articles.length < 5) {
            const headline = $(element).find('.ue-c-cover-content__headline-group').text().trim();
            const url = $(element).find('.ue-c-cover-content__link').attr('href');
            const elemento = $(element).find('.ue-c-cover-content__byline-name');
            const author = $(elemento).clone().children('.hidden-content').remove().end().text().trim();
            const location = $(element).find('.ue-c-cover-content__byline-location').text().trim();
            const paragraph = $(element).find('.ue-c-cover-content__footer').text().trim();
            if (headline) {
                const articleObj: IArticle = { headline, url, author, location, paragraph };
                articles.push(articleObj);
            }
        }
    });

    return articles
}

export { scrapeElPaisNews, scrapeElMundoNews }

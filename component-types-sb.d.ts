import {StoryblokStory} from 'storyblok-generate-ts'

export interface RichtextStoryblok {
  type: string;
  content?: RichtextStoryblok[];
  marks?: RichtextStoryblok[];
  attrs?: any;
  text?: string;
  [k: string]: any;
}

export type MultiassetStoryblok = {
  alt?: string;
  copyright?: string;
  id: number;
  filename: string;
  name: string;
  title?: string;
  [k: string]: any;
}[];

export interface AboutUsSectionStoryblok {
  title?: string;
  description?: RichtextStoryblok;
  images?: MultiassetStoryblok;
  background_color?: "" | "primary" | "secondary" | "ternary";
  _uid: string;
  component: "about_us_section";
  [k: string]: any;
}

export interface AllArticlesStoryblok {
  title?: string;
  _uid: string;
  component: "all-articles";
  [k: string]: any;
}

export interface AssetStoryblok {
  _uid?: string;
  id: number;
  alt?: string;
  name: string;
  focus?: string;
  source?: string;
  title?: string;
  filename: string;
  copyright?: string;
  fieldtype?: string;
  meta_data?: null | {
    [k: string]: any;
  };
  is_external_url?: boolean;
  [k: string]: any;
}

export interface ArticleStoryblok {
  image?: AssetStoryblok;
  title?: string;
  teaser?: string;
  content?: RichtextStoryblok;
  _uid: string;
  component: "article";
  [k: string]: any;
}

export interface ConfigStoryblok {
  header?: MainHeaderStoryblok[];
  footer?: MainFooterStoryblok[];
  _uid: string;
  component: "config";
  [k: string]: any;
}

export interface ContactSectionStoryblok {
  location?: any;
  background_color?: "" | "primary" | "secondary" | "ternary";
  title?: string;
  description?: RichtextStoryblok;
  address?: string;
  cta?: LinkButtonStoryblok[];
  opening_hours?: DayOpeningHoursStoryblok[];
  contact?: any;
  phone_number?: LinkButtonStoryblok[];
  email?: LinkButtonStoryblok[];
  _uid: string;
  component: "contact_section";
  [k: string]: any;
}

export interface DayOpeningHoursStoryblok {
  day?: string;
  hours?: string;
  _uid: string;
  component: "day_opening_hours";
  [k: string]: any;
}

export interface FaqCardStoryblok {
  question?: string;
  answer?: string;
  _uid: string;
  component: "faq_card";
  [k: string]: any;
}

export interface FaqSectionStoryblok {
  title?: string;
  faq_cards: FaqCardStoryblok[];
  _uid: string;
  component: "faq_section";
  [k: string]: any;
}

export interface HeroStoryblok {
  headline: string;
  subheadline?: string;
  background_image: AssetStoryblok;
  cta?: LinkButtonStoryblok[];
  _uid: string;
  component: "hero";
  [k: string]: any;
}

export interface HeroWithLinksStoryblok {
  title: string;
  links?: LinkStoryblok[];
  _uid: string;
  component: "hero_with_links";
  [k: string]: any;
}

export type MultilinkStoryblok =
  | {
      id?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "story";
      target?: "_self" | "_blank";
      story?: {
        name: string;
        created_at?: string;
        published_at?: string;
        id: number;
        uuid: string;
        content?: {
          [k: string]: any;
        };
        slug: string;
        full_slug: string;
        sort_by_date?: null | string;
        position?: number;
        tag_list?: string[];
        is_startpage?: boolean;
        parent_id?: null | number;
        meta_data?: null | {
          [k: string]: any;
        };
        group_id?: string;
        first_published_at?: string;
        release_id?: null | number;
        lang?: string;
        path?: null | string;
        alternates?: any[];
        default_full_slug?: null | string;
        translated_slugs?: null | any[];
        [k: string]: any;
      };
      [k: string]: any;
    }
  | {
      url?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "asset" | "url";
      target?: "_self" | "_blank";
      [k: string]: any;
    }
  | {
      email?: string;
      linktype?: "email";
      target?: "_self" | "_blank";
      [k: string]: any;
    };

export interface LinkStoryblok {
  link?: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  style?: "" | "link" | "primary" | "secondary";
  text?: string;
  _uid: string;
  component: "link";
  [k: string]: any;
}

export interface LinkButtonStoryblok {
  text: string;
  link: Exclude<MultilinkStoryblok, {linktype?: "email"} | {linktype?: "asset"}>;
  style: "" | "primary" | "secondary" | "ternary";
  _uid: string;
  component: "link_button";
  [k: string]: any;
}

export interface MainFooterStoryblok {
  socials?: MultiassetStoryblok;
  phone_number?: string;
  footer_menu?: LinkStoryblok[];
  opening_hours?: DayOpeningHoursStoryblok[];
  _uid: string;
  component: "main_footer";
  [k: string]: any;
}

export interface MainHeaderStoryblok {
  menu?: (LinkStoryblok | LinkButtonStoryblok)[];
  _uid: string;
  component: "main_header";
  [k: string]: any;
}

export interface MapSectionStoryblok {
  title: string;
  address?: string;
  description?: RichtextStoryblok;
  cta?: LinkButtonStoryblok[];
  background_color?: "" | "primary" | "secondary";
  _uid: string;
  component: "map_section";
  [k: string]: any;
}

export interface MenuCardStoryblok {
  title: string;
  menu: MenuRowStoryblok[];
  id: string;
  _uid: string;
  component: "menu_card";
  [k: string]: any;
}

export interface MenuCardsStoryblok {
  menu: MenuCardStoryblok[];
  _uid: string;
  component: "menu_cards";
  [k: string]: any;
}

export interface MenuRowStoryblok {
  item?: string;
  price?: string;
  _uid: string;
  component: "menu_row";
  [k: string]: any;
}

export interface MenuTeaserCardStoryblok {
  title: string;
  image: AssetStoryblok;
  _uid: string;
  component: "menu_teaser_card";
  [k: string]: any;
}

export interface MenuTeaserSectionStoryblok {
  title?: string;
  teaser_card: MenuTeaserCardStoryblok[];
  background_color: "" | "primary" | "secondary";
  cta?: (LinkStoryblok | LinkButtonStoryblok)[];
  _uid: string;
  component: "menu_teaser_section";
  [k: string]: any;
}

export interface PageStoryblok {
  body?: (
    | AboutUsSectionStoryblok
    | AllArticlesStoryblok
    | ContactSectionStoryblok
    | FaqSectionStoryblok
    | HeroStoryblok
    | HeroWithLinksStoryblok
    | MapSectionStoryblok
    | MenuCardsStoryblok
    | MenuTeaserSectionStoryblok
    | RatingStoryblok
    | ReviewsStoryblok
  )[];
  title?: string;
  description?: string;
  _uid: string;
  component: "page";
  uuid?: string;
  [k: string]: any;
}

export interface PopularArticlesStoryblok {
  headline?: string;
  articles?: (StoryblokStory<ArticleStoryblok> | string)[];
  _uid: string;
  component: "popular-articles";
  [k: string]: any;
}

export interface RatingStoryblok {
  title: string;
  rating: string;
  cta?: LinkButtonStoryblok[];
  background_color: "" | "primary" | "secondary";
  _uid: string;
  component: "rating";
  [k: string]: any;
}

export interface ReviewCardStoryblok {
  image: AssetStoryblok;
  name: string;
  role: string;
  rating: string;
  review: string;
  _uid: string;
  component: "review-card";
  [k: string]: any;
}

export interface ReviewsStoryblok {
  title: string;
  reviews: ReviewCardStoryblok[];
  background_color: "" | "primary" | "secondary";
  _uid: string;
  component: "reviews";
  [k: string]: any;
}

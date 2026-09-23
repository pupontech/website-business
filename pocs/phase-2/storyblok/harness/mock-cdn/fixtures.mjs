// Invented "POC Test" fixtures for the local mock Storyblok CDN (protocol rule R7).
// No real client, person, metric, testimonial or asset is represented here.
// Shape follows the Storyblok Content Delivery API v2 story payload as used by
// the official Astro guide: { story: { id, uuid, name, slug, full_slug, content } }.

const SHARED_FEATURE = {
	component: "feature",
	_uid: "poc-test-shared-feature-uid",
	headline: "POC Test Shared Feature Definition",
	text: "Draft text for the shared feature block.",
};

export const STORIES = {
	home: {
		published: {
			story: {
				id: 9000001,
				uuid: "poc-test-home-uuid",
				name: "POC Test Home",
				slug: "home",
				full_slug: "home",
				published_at: "2026-09-22T10:00:00.000Z",
				content: {
					component: "page",
					_uid: "poc-test-home-content-uid",
					title: "POC Test Home",
					seo: {
						title: "POC Test Home | modelled SEO title",
						description: "POC Test invented meta description (published).",
						og_image: "http://127.0.0.1:4399/assets/poc-test-og.png",
					},
					body: [
						{
							...SHARED_FEATURE,
							text: "Published text for the shared feature block.",
						},
						{
							component: "grid",
							_uid: "poc-test-home-grid-uid",
							columns: [
								{
									component: "teaser",
									_uid: "poc-test-home-teaser-1",
									headline: "POC Test Teaser One",
								},
								{
									component: "teaser",
									_uid: "poc-test-home-teaser-2",
									headline: "POC Test Teaser Two",
								},
							],
						},
					],
				},
			},
		},
		// The draft variant differs from the published one so that draft/published
		// separation can be asserted from served output rather than assumed.
		draft: {
			story: {
				id: 9000001,
				uuid: "poc-test-home-uuid",
				name: "POC Test Home (draft)",
				slug: "home",
				full_slug: "home",
				content: {
					component: "page",
					_uid: "poc-test-home-content-uid",
					title: "POC Test Home (draft)",
					seo: {
						title: "POC Test Home | modelled SEO title",
						description:
							"POC Test invented meta description (published).",
						og_image: "http://127.0.0.1:4399/assets/poc-test-og.png",
					},
					body: [
						{
							...SHARED_FEATURE,
							text: "DRAFT-ONLY-EDIT-2026-09-22",
						},
						{
							component: "teaser",
							_uid: "poc-test-home-teaser-3",
							headline: "POC Test Teaser Three (draft only)",
						},
					],
				},
			},
		},
	},
	"poc-test-second-page": {
		published: {
			story: {
				id: 9000002,
				uuid: "poc-test-second-page-uuid",
				name: "POC Test Second Page",
				slug: "poc-test-second-page",
				full_slug: "poc-test-second-page",
				published_at: "2026-09-22T10:05:00.000Z",
				content: {
					component: "page",
					_uid: "poc-test-second-page-content-uid",
					title: "POC Test Second Page",
					seo: {
						title: "POC Test Second Page | modelled SEO title",
						description: "POC Test invented meta description (second page).",
					},
					body: [
						{
							...SHARED_FEATURE,
							text: "Published text for the shared feature block.",
						},
					],
				},
			},
		},
		draft: null, // no draft difference on this story
	},
};

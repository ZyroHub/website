<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig();

const { data: contributorsData } = await useFetch('/api/contributors', {});

const getBuyMeACoffeeSupporterUrl = (username: string, type: string) => {
	username = username.replace('@', '');

	if (['twitter', 'x'].includes(type)) return `https://www.x.com/${username}`;

	if (type === 'instagram') return `https://www.instagram.com/${username}`;
	if (type === 'tiktok') return `https://www.tiktok.com/@${username}`;
};
</script>

<style lang="scss" scoped>
@use '~/assets/scss/components/contributors.scss';
</style>

<template>
	<div>
		<div v-if="contributorsData" class="flex flex-col gap-8">
			<div v-if="contributorsData.github_contributors.total">
				<p class="contributors-title"><Icon name="mdi:github" :size="24" /> GitHub Contributors</p>

				<div class="contributors-list">
					<div
						v-for="contributor in contributorsData.github_contributors.data?.slice(0, 15)"
						:key="contributor.id"
						class="contributors-item">
						<a :href="`https://github.com/${contributor.name}`" target="_blank">
							<img :src="contributor.avatar" :alt="contributor.name" />
						</a>
					</div>

					<a
						:href="`https://github.com/${runtimeConfig.public.github_repo}/graphs/contributors`"
						target="_blank">
						<button class="contributors-item-more"><Icon name="mdi:dots-horizontal" /></button>
					</a>
				</div>
			</div>

			<div v-if="contributorsData.buy_me_a_coffee_supporters.total">
				<p class="contributors-title">
					<Icon name="simple-icons:buymeacoffee" :size="24" /> Buy Me a Coffee Supporters
				</p>

				<div class="contributors-list">
					<div
						v-for="contributor in contributorsData.buy_me_a_coffee_supporters.data?.slice(0, 15)"
						:key="contributor.id"
						class="contributors-item">
						<a :href="getBuyMeACoffeeSupporterUrl(contributor.name, contributor.type)" target="_blank">
							<img :src="contributor.avatar" :alt="contributor.name" />
						</a>
					</div>

					<a
						:href="`https://www.buymeacoffee.com/${runtimeConfig.public.buy_me_a_coffee_slug}`"
						target="_blank">
						<button class="contributors-item-more"><Icon name="mdi:dots-horizontal" /></button>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

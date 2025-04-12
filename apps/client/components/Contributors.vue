<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig();

const { t } = useI18n();

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
		<div v-if="contributorsData" class="flex flex-col md:flex-row lg:flex-col gap-8">
			<div v-if="contributorsData.github_contributors.total">
				<p class="contributors-title">
					<Icon name="mdi:github" :size="24" /> {{ t('components.contributors.github') }}
				</p>

				<div class="contributors-list">
					<Tooltip
						v-for="contributor in contributorsData.github_contributors.data?.slice(0, 15)"
						:key="contributor.id">
						<template #trigger>
							<div class="contributors-item">
								<a :href="`https://github.com/${contributor.name}`" target="_blank">
									<img :src="contributor.avatar" :alt="contributor.name" />
								</a>
							</div>
						</template>

						<template #default>
							<p>{{ contributor.name }} ({{ contributor.contributions }})</p>
						</template>
					</Tooltip>

					<Tooltip>
						<template #trigger>
							<a
								:href="`https://github.com/${runtimeConfig.public.github_repo}/graphs/contributors`"
								target="_blank">
								<button class="contributors-item-more" :aria-label="t('components.contributors.more')">
									<Icon name="mdi:dots-horizontal" />
								</button>
							</a>
						</template>

						<template #default>
							<p>{{ t('components.contributors.more') }}</p>
						</template>
					</Tooltip>
				</div>
			</div>

			<div v-if="contributorsData.buy_me_a_coffee_supporters.total">
				<p class="contributors-title">
					<Icon name="simple-icons:buymeacoffee" :size="24" />
					{{ t('components.contributors.buy_me_a_coffee') }}
				</p>

				<div class="contributors-list">
					<Tooltip
						v-for="contributor in contributorsData.buy_me_a_coffee_supporters.data?.slice(0, 15)"
						:key="contributor.id">
						<template #trigger>
							<div class="contributors-item">
								<a
									:href="getBuyMeACoffeeSupporterUrl(contributor.name, contributor.type)"
									target="_blank">
									<img :src="contributor.avatar" :alt="contributor.name" />
								</a>
							</div>
						</template>

						<template #default>
							<p>{{ contributor.name }} ({{ contributor.type }})</p>
						</template>
					</Tooltip>

					<Tooltip>
						<template #trigger>
							<a
								:href="`https://www.buymeacoffee.com/${runtimeConfig.public.buy_me_a_coffee_slug}`"
								target="_blank">
								<button class="contributors-item-more"><Icon name="mdi:dots-horizontal" /></button>
							</a>
						</template>

						<template #default>
							<p>{{ t('components.contributors.more') }}</p>
						</template>
					</Tooltip>
				</div>
			</div>
		</div>
	</div>
</template>

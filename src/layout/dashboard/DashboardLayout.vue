<template>
  <div class="dashboard-layout">
    <weni-notification class="dashboard-layout__notification"/>
    <div
      :class="
      collapse ? 'dashboard-layout__main-panel': 'dashboard-layout__main-panel--collapsed'">
      <div class="dashboard-layout__main-panel__header">
      <div class="dashboard-layout__main-panel__container">
        <div class="dashboard-layout__main-panel__header__info">
          <div class="dashboard-layout__main-panel__header__info__badge">
            <custom-icon
              :value="categoryIcon"
              size="large"
              class="dashboard-layout__main-panel__header__info__badge__icon"/>
          </div>
          <div
            v-show="hasLoaded"
            class="
            dashboard-layout__main-panel__header__info__left">
            <div
              class="
              dashboard-layout__main-panel__header__info__left__wrapper">
              <p
                class="
               dashboard-layout__main-panel__header__info__left__wrapper__title">
                {{ getCurrentRepository.name }}
              </p>
              <version-dropdown
                v-if="versionEnabled"/>
            </div>
            <span>{{ $t('webapp.dashboard.created_by') }}
              <b>{{ getCurrentRepository.owner__nickname }}</b>
            </span>
          </div>
        </div>
        <div
          class="dashboard-layout__main-panel__header__right">
          <div
            v-show="hasLoaded"
            v-if="warningsCount > 0"
            class="dashboard-layout__main-panel__header__right__icons">
            <b-icon
              icon="alert"
              size="is-small"
              type="is-white"/>
            <span>{{ warningsCount }} {{ $t('webapp.dashboard.warning') }}</span>
          </div>
          <div class="dashboard-layout__main-panel__header__right__container">
            <!-- <div
              class="dashboard-layout__main-panel__header__right__container__tutorial">
              <b-icon
                v-if="authenticated && tutorialEnabled"
                id="tour-tutorial_button-step-0"
                type="is-white"
                icon="help-circle"
                @click.native="openBeginnerTutorialModal()"
              />
            </div> -->
            <b-dropdown
              v-show="hasLoaded"
              position="is-bottom-left"
              class="dashboard-layout__main-panel__header__right__container__dropdown"
              aria-role="list">
              <user-avatar
                slot="trigger"
                :profile="myProfile"
                size="medium"
                class="dashboard-layout__main-panel__header__right__container__user"/>
              <b-icon
                slot="trigger"
                icon="chevron-down"
                class="dashboard-layout__main-panel__header__right__container__icon"/>
              <b-dropdown-item
                v-if="!authenticated"
                aria-role="listitem"
                @click="signIn()">{{ $t('webapp.landing_page.signin') }}</b-dropdown-item>
              <b-dropdown-item
                v-if="!authenticated"
                aria-role="listitem"
                @click="signUp()">{{ $t('webapp.landing_page.signup') }}</b-dropdown-item>
              <b-dropdown-item
                v-if="authenticated"
                aria-role="listitem"
                @click="routerHandle('profile')">{{ myProfile.name }}</b-dropdown-item>
              <b-dropdown-item
                v-if="authenticated"
                aria-role="listitem"
                @click="routerHandle('orgs')">{{ $t('webapp.layout.orgs') }}</b-dropdown-item>
              <b-dropdown-item
                v-if="authenticated"
                aria-role="listitem"
                @click="openNewRepository()">
                {{ $t('webapp.layout.start_you_bot') }}
              </b-dropdown-item>
              <b-dropdown-item
                aria-role="listitem"
                @click="routerHandle('home')">
                {{ $t('webapp.dashboard.exit_inteligence') }}
              </b-dropdown-item>
              <b-dropdown-item
                v-if="authenticated"
                aria-role="listitem"
                @click="logout()">{{ $t('webapp.layout.logout') }}</b-dropdown-item>
            </b-dropdown>
          </div>
          <side-bar @collapse="collapseHandle()" />
        </div>
      </div>
      </div>
      <router-view />
    </div>
    <tour
      v-if="getFinalModal && getFinalMessage !== 'true'"
      :step-count="1"
      name="tutorial_button" />
  </div>

</template>
<style lang="scss">
</style>
<script>

import SideBar from '@/components/repository/sidebar/SideBar';
import UserAvatar from '@/components/user/UserAvatar';
import VersionDropdown from '@/layout/dashboard/VersionDropdown';
import CustomIcon from '@/components/shared/CustomIcon';
import { mapActions, mapGetters } from 'vuex';
import Tour from '@/components/Tour';
import Analytics from '@/utils/plugins/analytics';
import WeniNotification from '@/components/WeniNotification';

export default {
  name: 'DashboardLayout',
  components: {
    SideBar,
    UserAvatar,
    VersionDropdown,
    CustomIcon,
    Tour,
    WeniNotification,
  },
  data() {
    return {
      collapse: true,
      isLoading: false,
      isFullPage: true,
      profilyStyle: '',
      beginnerTutorialModalOpen: false,
    };
  },
  computed: {
    ...mapGetters([
      'getCurrentRepository',
      'myProfile',
      'authenticated',
      'versionEnabled',
      'getFinalModal',
      'getFinalMessage',
      'getRequirements',
      'getSelectedVersion'
    ]),
    hasLoaded() {
      if (this.getCurrentRepository.name) return true;
      return false;
    },
    warningsCount() {
      if (!this.getCurrentRepository
        || !this.getCurrentRepository.selectedRepositoryselectedRepository) return 0;
      return Object.keys(this.getRequirements.languages_warnings).length;
    },
    tutorialEnabled() {
      return process.env.VUE_APP_BOTHUB_WEBAPP_TUTORIAL_ENABLED;
    },
    categoryIcon() {
      if (!this.getCurrentRepository
      || !this.getCurrentRepository.categories_list
      || this.getCurrentRepository.categories_list.length < 1) return 'botinho';
      return this.getCurrentRepository.categories_list[0].icon || 'botinho';
    },
  },
  destroyed(){
    this.setRepository({})
    this.resetRepositoryVersion()
  },
  methods: {
    ...mapActions([
      'logout',
      'getFirstFiveVersions',
      'setTutorialMenuActive',
      'setRepository',
      'resetRepositoryVersion'
    ]),
    openBeginnerTutorialModal() {
      if (process.env.VUE_APP_BOTHUB_WEBAPP_TUTORIAL_ENABLED) {
        this.setTutorialMenuActive();
        Analytics.send({ category: 'Tutorial', event: 'tutorial open event' });
      }
    },
    collapseHandle() {
      this.collapse = !this.collapse;
    },
    routerHandle(path) {
      this.$router.push({
        name: `${path}`,
      });
    },
    openNewRepository() {
      this.$router.push({
        name: 'new',
      });
    },
    signIn() {
      this.$router.push({
        name: 'signIn',
      });
    },
    signUp() {
      this.$router.push({
        name: 'signUp',
      });
    },
  },
};
</script>
<style lang="scss">
@import '~@/assets/scss/utilities.scss';
@import '~@/assets/scss/colors.scss';
@import '~@/assets/scss/variables.scss';

html{
  overflow-y:auto
}
.dashboard-layout {

  &__notification{
    top: 0;
    position: fixed;
    z-index: 9;
  }

  &__main-panel {
    width: calc( 100% - #{$menu-expanded-size} - #{$menu-padding});
    position: relative;
    float: right;

    &__container{
      background-color: $color-white;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 2.5rem 0 2rem;
      border-top-left-radius: 0.5rem;
      margin-top: 0.5rem;
    }

    &__header {
      position: fixed;
      width: inherit;
      z-index: 9;
      top: 3.6rem;
      height: 6rem;
      background-color: #f4f6f8;
      display: flex;
      justify-content: space-between;
      align-items: center;
       @media screen and (max-width: $mobile-width) {
        top: 10rem;
      }
      &__info {
        display: flex;
        align-items: center;
          @media screen and (max-width: 52rem) {
                  font-size: 13px;
          }
        &__badge {
          position: relative;
          display: block;
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 50%;
          background-color: $color-primary;
          overflow: hidden;

          &__icon {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: $color-white;
          }
        }

        &__left {
          margin: 0 .8rem;

          &__wrapper {
            display: flex;
            align-items: center;
            justify-content: space-between;

            &__title {
              font-family: $font-family;
              font-weight: $font-weight-medium;
              font-size: 1.3rem;
                @media screen and (max-width: 52rem) {
                  font-size: 13px;
                }
            }
          }

            p, span {
              color: $color-fake-grey;
            }

            b {
              font-family: $font-family;
              color: $color-primary;
            }
        }
      }

      &__right {
        display: flex;
        align-items: center;

        &__icons {
          margin: 0 .3rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: $color-white;

          span {
            margin: 0 .3rem;

          }
        }
        &__container{
          display: flex;
          align-items: center;
          justify-content: space-around;
          @media screen and (max-width: 52rem) {
              display: flex;
              height: 70px;
          }

          &__tutorial{
            z-index:999999;
            padding: 0 1rem 0 4rem;
            cursor: pointer;
            @media screen and (max-width: 52rem) {
                    padding: 0;
                    display: flex;
                    align-items: center;
                    width: 28px;
            }
          }

          &__dropdown{
              font-family: $font-family;
          }

          &__icon {
          margin-left: 0.5rem;
          color: $color-fake-grey;
          width: 1rem;
          height: 3rem;
          cursor: pointer;
          float: right;
        }

        &__user {
          @media screen and (max-width: 52rem) {
          margin-left: 1rem;
          margin-bottom: 0.4rem;
          width: 35px !important;
          height: 35px !important;
          }
          @media screen and (max-width: 30rem) {
           margin-top: 3.5rem;
          }

        }
        }
        @media screen and (max-width: 52rem) {
            display: flex;
            flex-direction: column-reverse;
            font-size: 12px;
            margin-top: 0.5rem;
            width: 20rem;
        }
      }

    }

    &--collapsed {
       position: relative;
       float: right;
       width: calc( 100% - #{$menu-collapsed-size} - #{$menu-padding-collapsed});
    }
  }
}
</style>

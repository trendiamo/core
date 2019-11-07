import auth from 'auth'

const routes = {
  accountRoot(accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}`
  },
  accounts() {
    return '/accounts'
  },
  dataDashboard(accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/data-dashboard`
  },
  isPasswordReset() {
    return window.location.pathname.includes('/password-reset')
  },
  login() {
    return '/login'
  },
  newAccount() {
    return '/accounts/new'
  },
  outrosList(accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/outros`
  },
  outroCreate(accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/outros/create`
  },
  outroEdit(id, accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/outros/${id}/edit`
  },
  passwordChange() {
    return '/change-password'
  },
  passwordReset() {
    return '/password-reset'
  },
  sellersList(accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/sellers`
  },
  sellerCreate(accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/sellers/create`
  },
  sellerEdit(id, accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/sellers/${id}/edit`
  },
  imagesList(accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/images`
  },
  requestPasswordReset() {
    return '/request-password-reset'
  },
  root() {
    return '/'
  },
  signup() {
    return '/signup'
  },
  signupConfirm() {
    return '/signup/confirm'
  },
  simpleChatsList(accountSlug = auth.getSlug()) {
    return auth.isSeller() ? '/content-creation/simple-chats' : `/a/${accountSlug}/simple-chats`
  },
  simpleChatCreate(accountSlug = auth.getSlug()) {
    return auth.isSeller() ? '/content-creation/simple-chats/create' : `/a/${accountSlug}/simple-chats/create`
  },
  simpleChatEdit(id, accountSlug = auth.getSlug()) {
    return auth.isSeller() ? `/content-creation/simple-chats/${id}/edit` : `/a/${accountSlug}/simple-chats/${id}/edit`
  },
  simpleChatShow(id, accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/simple-chats/${id}`
  },
  showcasesList(accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/showcases`
  },
  showcaseCreate(accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/showcases/create`
  },
  showcaseEdit(id, accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/showcases/${id}/edit`
  },
  triggerCreate(accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/triggers/create`
  },
  triggersList(accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/triggers`
  },
  triggerEdit(id, accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/triggers/${id}/edit`
  },
  welcome(accountSlug = auth.getSlug()) {
    return auth.isAffiliate() ? '/welcome' : `/a/${accountSlug}/welcome`
  },
  urlGenerator(accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/url-generator`
  },
  userInvite(accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/settings/account/invite`
  },
  settingsTheme(accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/settings/theme`
  },
  settingsAccount(accountSlug = auth.getSlug()) {
    return `/a/${accountSlug}/settings/account`
  },
  affiliatePartners() {
    return '/affiliate-partners'
  },
  affiliatePartner(brandId) {
    return `/affiliate-partners/${brandId}`
  },
  yourReferrals() {
    return '/your-referrals'
  },
  revenues() {
    return '/revenues'
  },
  contentCreation() {
    return '/content-creation'
  },
  nullRoute() {
    return '/empty'
  },
  termsAndConditions() {
    return '/terms-and-conditions'
  },
  privacyPolicy() {
    return '/privacy-policy'
  },
  cookiePolicy() {
    return '/cookie-policy'
  },
  affiliateProgrammeTermsAndConditions() {
    return '/affiliate-programme-terms-and-conditions'
  },
  affiliateTrackerTermsAndConditions() {
    return '/affiliate-tracker-terms-and-conditions'
  },
  affiliateTrackerPrivacyPolicy() {
    return '/affiliate-tracker-privacy-policy'
  },
  impactPointShop() {
    return '/impact-point-shop'
  },
}

export default routes

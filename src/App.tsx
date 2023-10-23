import React from 'react';
import './index.css';

function App() {
  return (
    <div className="site">
      <header className="TopNavigationWrapper" id="TopNavigationReactTarget">
        <div className="TopNavigation">
          <div className="TopNavigation-content flex">
            <div className="TopNavigation-contentLeft">
              <div className="TopNavigationItem LogoNavigationItem">
                <div className="SiteHeaderLogo">
                  <div className="SiteHeaderLogo-full">
                    <a className="SiteHeaderLogo-link" data-testid="logo-button" href="/">
                      <div
                        aria-label="Quizlet"
                        className="SiteLogo SiteLogo--premium"
                        role="img"
                        title="Quizlet"
                      >
                        <div data-testid="PremiumLogo" className="pltikop">
                          <svg
                            data-testid="PremiumLogo"
                            fill="none"
                            viewBox="0 0 597 87"
                            xmlns="http://www.w3.org/2000/svg"
                            width={50}
                            height={50}
                          >
                            <path
                              d="M146.063 26.652h-15.102a1.146 1.146 0 0 0-1.145 1.145v31.751c0 7.895-4.941 10.66-10.672 10.66-5.731 0-10.671-2.96-10.671-10.66v-31.75a1.145 1.145 0 0 0-1.145-1.146H92.225a1.145 1.145 0 0 0-1.145 1.145v33.16c0 16.969 13.242 24.863 28.053 24.863 14.81 0 28.052-7.894 28.052-24.863v-33.16a1.144 1.144 0 0 0-1.122-1.145zM264.045 6.154h-14.902c-.632 0-1.145.513-1.145 1.145v75.456c0 .632.513 1.145 1.145 1.145h14.902c.633 0 1.145-.513 1.145-1.145V7.3c0-.632-.512-1.145-1.145-1.145zM239.683 26.652h-52.372a1.146 1.146 0 0 0-1.145 1.145v12.595a1.143 1.143 0 0 0 1.145 1.145h25.362l-30.801 40.51a1.142 1.142 0 0 0-.114 1.202 1.14 1.14 0 0 0 1.024.636h54.909a1.146 1.146 0 0 0 1.145-1.145V70.145A1.148 1.148 0 0 0 237.691 69h-27.377l30.285-40.521a1.143 1.143 0 0 0-.916-1.827zM372.483 26.816h-8.462V7.299a1.144 1.144 0 0 0-1.145-1.145h-14.885a1.143 1.143 0 0 0-1.145 1.145v19.517h-8.404a1.146 1.146 0 0 0-1.145 1.145v12.595a1.148 1.148 0 0 0 1.145 1.145h8.387v41.043a1.148 1.148 0 0 0 1.145 1.145h14.885a1.145 1.145 0 0 0 1.145-1.145V41.712h8.462a1.144 1.144 0 0 0 1.145-1.145V27.972a1.143 1.143 0 0 0-1.128-1.156zM173.622 26.652h-14.793c-.633 0-1.145.513-1.145 1.145v54.96c0 .633.512 1.145 1.145 1.145h14.793c.632 0 1.145-.512 1.145-1.145v-54.96c0-.632-.513-1.145-1.145-1.145zM166.224 0a9.964 9.964 0 0 0-9.105 6.222 9.972 9.972 0 0 0 2.201 10.805 9.964 9.964 0 0 0 10.813 2.164 9.968 9.968 0 0 0 6.19-9.126 10.001 10.001 0 0 0-2.936-7.153 10 10 0 0 0-7.163-2.911zM43.666 3.839a40.997 40.997 0 1 0 16.356 77.225 1.145 1.145 0 0 1 1.145.063 31.585 31.585 0 0 0 3.716 2.13 32.02 32.02 0 0 0 14.284 3.194 1.145 1.145 0 0 0 1.145-1.145V71.394a1.145 1.145 0 0 0-.95-1.145 16.151 16.151 0 0 1-3.83-1.1 1.145 1.145 0 0 1-.493-1.67A40.98 40.98 0 0 0 43.626 3.815l.04.023zm-27.48 40.91a24.823 24.823 0 1 1 24.806 24.796A24.824 24.824 0 0 1 16.17 44.75h.017zM301.809 24.32a30.781 30.781 0 0 0-28.448 30.099 30.784 30.784 0 0 0 54.291 20.465 1.144 1.144 0 0 0-.143-1.649l-8.937-7.179a1.144 1.144 0 0 0-1.574.143 17.003 17.003 0 0 1-28.763-5.152h45.177a1.142 1.142 0 0 0 1.145-.939 30.25 30.25 0 0 0 .423-5.072 30.809 30.809 0 0 0-20.677-29.09 30.812 30.812 0 0 0-12.494-1.625zm-13.574 24.681a17.031 17.031 0 0 1 31.883 0h-31.883zM473.616 6.352h-14.78a1.14 1.14 0 0 0-1.135 1.143V82.89c0 .632.508 1.143 1.135 1.143h14.78c.627 0 1.134-.513 1.134-1.143V7.498a1.14 1.14 0 0 0-1.134-1.146zM390 7.364c0-.752.612-1.364 1.364-1.364h31.548c11.864 0 26.305 9.293 26.305 26.422 0 15.787-13.431 26.422-26.305 26.422h-15.673v23.825c0 .752-.612 1.365-1.364 1.365h-14.511A1.366 1.366 0 0 1 390 82.669V7.364zm31.902 35.805c3.469 0 10.076-2.237 10.076-10.747 0-8.62-6.603-10.747-10.076-10.747h-14.663v21.494h14.663zM555.468 67.448a1.364 1.364 0 0 1 1.942-.047c3.203 3.048 8.528 5.15 14.495 5.15 5.932 0 8.508-1.903 8.508-4.589 0-3.808-7.725-4.144-16.342-7.052-7.835-2.685-12.983-7.164-12.983-15.674 0-12.092 10.523-18.138 21.939-18.138 9.335 0 15.595 2.978 19.847 6.447.558.456.655 1.271.234 1.852l-6.396 8.833c-.433.6-1.263.74-1.875.324-2.557-1.743-6.52-3.349-12.258-3.349-3.808 0-5.597 1.68-5.597 3.583 0 3.804 4.592 3.134 15.446 6.942 10.185 3.47 13.88 8.845 13.88 16.01 0 10.86-7.612 19.03-24.851 19.03-11.892 0-19.426-4.252-23.823-9.133a1.356 1.356 0 0 1 .027-1.832l7.807-8.357zM540.077 28.764h-14.698a1.119 1.119 0 0 0-1.115 1.123v31.13c0 7.742-4.809 10.451-10.387 10.451-5.577 0-10.387-2.904-10.387-10.45V29.885c0-.296-.117-.584-.327-.795a1.112 1.112 0 0 0-.788-.327h-14.698a1.119 1.119 0 0 0-1.115 1.123V62.4c0 16.637 12.89 24.38 27.304 24.38 14.413 0 27.303-7.743 27.303-24.38V29.886a1.123 1.123 0 0 0-1.092-1.123z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="TopNavigation-menuItems">
                <div className="NavigationTabs">
                  <a
                    className="NavigationTab s13oqxd2 r1k7ho1y etur5fu"
                    data-testid="NavigationTab-anchor"
                    href="/latest"
                  >
                    <span className="NavigationTab--span">Home</span>
                  </a>
                  <div aria-expanded="false" className="d17q9lq7">
                    <button
                      className="NavigationTab r1ep6ugx r1k7ho1y etur5fu"
                      data-testid="NavigationTab-anchor"
                    >
                      <span className="NavigationTab--span">
                        Your library
                        <svg
                          aria-label="caret down"
                          className="AssemblyIcon AssemblyIcon--small"
                          role="img"
                        ></svg>
                      </span>
                    </button>
                  </div>
                </div>
                <div className="divider"></div>
                <div className="hideAbove--l" hidden>
                  <div aria-label="Settings" role="menu" className="n1xoao7y m1pxhqs7">
                    <div className="h1hbonvg">
                      <div className="s86t0cq">
                        <div className="s1gqq44r">
                          <div className="w1kz7pvc">
                            <img
                              src="https://assets.quizlet.com/a/j/dist/app/i/animals/108.3b3090077134db3.jpg"
                              alt="Profile"
                            />
                          </div>
                          <div className="s1iko5nv">
                            <div className="s14wy7n4">passmonnha12345</div>
                            <div className="sxk88g7">passmonnha12345@gmail.com</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w16rzz6x i1xn8hjb s1ovpdog">
                      <a
                        aria-disabled="false"
                        role="menuitem"
                        data-key="Profile"
                        className="r1k7ho1y"
                        href="/passmonnha12345"
                      >
                        <div className="c1ap9d88">
                          <div className="iiekfr8">
                            <div className="i1q3l8tw">
                              <svg
                                className="AssemblyIcon AssemblyIcon--medium"
                                role="presentation"
                              >
                                <noscript></noscript>
                                <use></use>
                                <noscript></noscript>
                              </svg>
                              <span className="AssemblyMenuItem--title t1nsp0j0">Profile</span>
                            </div>
                          </div>
                        </div>
                      </a>
                      <a
                        aria-disabled="false"
                        role="menuitem"
                        data-key="Settings"
                        className="r1k7ho1y"
                        href="/settings"
                      >
                        <div className="c1ap9d88">
                          <div className="iiekfr8">
                            <div className="i1q3l8tw">
                              <svg
                                className="AssemblyIcon AssemblyIcon--medium"
                                role="presentation"
                              >
                                <noscript></noscript>
                                <use></use>
                                <noscript></noscript>
                              </svg>
                              <span className="AssemblyMenuItem--title t1nsp0j0">Settings</span>
                            </div>
                          </div>
                        </div>
                      </a>
                      <a
                        aria-disabled="false"
                        role="menuitem"
                        data-key="Manage subscription"
                        className="r1k7ho1y"
                        href="/settings/manage-subscription"
                      >
                        <div className="c1ap9d88">
                          <div className="iiekfr8">
                            <div className="i1q3l8tw">
                              <svg
                                className="AssemblyIcon AssemblyIcon--medium"
                                role="presentation"
                              >
                                <noscript></noscript>
                                <use></use>
                                <noscript></noscript>
                              </svg>
                              <span className="AssemblyMenuItem--title t1nsp0j0">
                                Manage subscription
                              </span>
                            </div>
                          </div>
                        </div>
                      </a>
                      <a
                        aria-disabled="false"
                        role="menuitem"
                        data-key="Dark mode"
                        className="r1k7ho1y"
                        href="/settings/night-theme/on?redir=%2Flatest"
                      >
                        <div className="c1ap9d88">
                          <div className="iiekfr8">
                            <div className="i1q3l8tw">
                              <svg
                                className="AssemblyIcon AssemblyIcon--medium"
                                role="presentation"
                              >
                                <noscript></noscript>
                                <use></use>
                                <noscript></noscript>
                              </svg>
                              <span className="AssemblyMenuItem--title t1nsp0j0">Dark mode</span>
                            </div>
                          </div>
                        </div>
                      </a>
                      <button
                        aria-disabled="false"
                        role="menuitem"
                        data-key="Log out"
                        className="r1ep6ugx r1k7ho1y"
                      >
                        <div className="c1ap9d88">
                          <div className="iiekfr8">
                            <div className="i1q3l8tw">
                              <span className="AssemblyMenuItem--title t1nsp0j0">Log out</span>
                            </div>
                          </div>
                        </div>
                      </button>
                      <a
                        aria-disabled="false"
                        role="menuitem"
                        data-key="Privacy policy"
                        className="r1k7ho1y"
                        href="/privacy"
                      >
                        <div className="c1ap9d88">
                          <div className="iiekfr8">
                            <div className="i1q3l8tw">
                              <span className="AssemblyMenuItem--title t1nsp0j0">
                                Privacy policy
                              </span>
                            </div>
                          </div>
                        </div>
                      </a>
                      <a
                        aria-disabled="false"
                        role="menuitem"
                        data-key="Help and feedback"
                        className="r1k7ho1y"
                        href="/help"
                      >
                        <div className="c1ap9d88">
                          <div className="iiekfr8">
                            <div className="i1q3l8tw">
                              <span className="AssemblyMenuItem--title t1nsp0j0">
                                Help and feedback
                              </span>
                            </div>
                          </div>
                        </div>
                      </a>
                      <a
                        aria-disabled="false"
                        role="menuitem"
                        data-key="Group discounts"
                        className="r1k7ho1y"
                        href="/upgrade/teacher/group"
                      >
                        <div className="c1ap9d88">
                          <div className="iiekfr8">
                            <div className="i1q3l8tw">
                              <span className="AssemblyMenuItem--title t1nsp0j0">
                                Group discounts
                              </span>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="TopNavigation-contentMiddle">
              <div className="TopNavigationItem FullSeachNavigationItem">
                <div className="has-premiumBranding s1tlc74t">
                  <form action="/search/" className="s19dmjr1" role="search">
                    <div className="s2y71yx">
                      <div className="searchInputSearchIconWrapper sellgo5">
                        <svg
                          aria-label="search"
                          className="AssemblyIcon AssemblyIcon--small"
                          role="img"
                        ></svg>
                      </div>
                      <div className="s1b8qj0">
                        <div className="UIAutosuggest">
                          <div
                            // role="combobox"
                            aria-haspopup="listbox"
                            aria-owns="react-autowhatever-site-header-global-search-autosuggest"
                            aria-expanded="false"
                            className="react-autosuggest__container"
                            aria-label="Search"
                          >
                            <label className="AssemblyInput">
                              <input
                                aria-autocomplete="list"
                                aria-controls="react-autowhatever-site-header-global-search-autosuggest"
                                className="AssemblyInput-input AssemblyInput-placeholder"
                                id="GlobalSearchBar"
                                aria-label="Search"
                                placeholder="Study sets, textbooks, questions"
                                type="text"
                                value=""
                              />
                            </label>
                            {/* <div id="react-autowhatever-site-header-global-search-autosuggest" role="listbox" className="react-autosuggest__suggestions-container" aria-label="Search">
                            </div> */}
                          </div>
                        </div>
                      </div>
                      <div
                        aria-label="Close"
                        aria-pressed="false"
                        className="s1al0a3m"
                        role="button"
                      >
                        <svg
                          aria-label="close x"
                          className="AssemblyIcon AssemblyIcon--small"
                          role="img"
                        ></svg>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="TopNavigation-contentRight">
              <div className="TopNavigationItem RightNavigationItem">
                <div data-overlay-container="true">
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                    id="react-aria2421048645-69"
                    aria-label="Create"
                    className="AssemblyButtonBase AssemblyIconButton AssemblyIconButton--primary AssemblyIconButton--circle AssemblyButtonBase--medium AssemblyButtonBase--circle"
                    title="Create"
                  >
                    <svg
                      aria-label="Create"
                      className="AssemblyIcon AssemblyIcon--medium"
                      role="img"
                    ></svg>
                  </button>
                </div>
              </div>
              <div className="SiteAvatar TopNavigationItem RightNavigationItem">
                <div data-overlay-container="true">
                  <div
                    id="react-aria2421048645-96"
                    aria-haspopup="true"
                    aria-expanded="false"
                    aria-label="Settings"
                    className="Avatar"
                    role="button"
                  >
                    <div className="w1kz7pvc">
                      <img
                        alt="Profile"
                        className="AssemblyAvatar"
                        src="https://assets.quizlet.com/a/j/dist/app/i/animals/108.3b3090077134db3.jpg"
                        // style='background-image: url("https://assets.quizlet.com/a/j/dist/app/i/animals/108.3b3090077134db3.jpg"); height: 40px; width: 40px;'
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="TopNavigationItem RightNavigationItem">
                <div className="SiteUpgradeButton">
                  <a
                    role="button"
                    href="/settings?redir=%2Flatest#upgrade-setting"
                    className="AssemblyButtonBase AssemblyPrimaryButton--upgrade AssemblyButtonBase--medium AssemblyButtonBase--padding"
                  >
                    <span>17 days left in trial</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="DashBoardLayout"></div>
      <footer className="SiteFooter"></footer>
    </div>
  );
}

export default App;

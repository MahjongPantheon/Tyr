/*
 * Tyr - Allows online game recording in japanese (riichi) mahjong sessions
 * Copyright (C) 2016 Oleg Klimenko aka ctizen <me@ctizen.net>
 *
 * This file is part of Tyr.
 *
 * Tyr is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Tyr is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Tyr.  If not, see <http://www.gnu.org/licenses/>.
 */

export const icons: { [key: string]: string } = {
  'common': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle fill="#FFDD67" cx="32" cy="32" r="30"/><circle fill="#664E27" cx="20.5" cy="24.5" r="5"/><circle fill="#664E27" cx="43.5" cy="24.5" r="5"/><path fill="#664E27" d="M49.001 38.05c0-.803-.475-1.808-1.822-2.066-3.465-.662-8.582-1.343-15.18-1.343-6.595 0-11.714.681-15.177 1.343-1.35.258-1.822 1.263-1.822 2.066 0 7.271 5.611 14.591 17 14.591 11.388 0 17.001-7.32 17.001-14.591z"/><path fill="#FFF" d="M44.69 38.283c-2.195-.368-6.838-1.013-12.69-1.013-5.853 0-10.496.645-12.691 1.013-1.294.218-1.373.743-1.283 1.486.054.442.137.975.265 1.553.142.64.262.936 1.266.816 1.92-.229 22.967-.229 24.888 0 1.004.119 1.123-.177 1.266-.816.127-.578.211-1.11.264-1.553.088-.743.01-1.268-1.285-1.486z"/></svg>',

  'down': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="#FFDD67" d="M31.765 36.906s-4.354-.869-.753 6.613c2.608 5.418 2.348 11.709 0 15.048-3.757 5.344-11.068 3.592-10.311.523 2.607-10.546-3.284-13.688-6.328-20.345C11.288 32 11.627 22.425 13.046 13.9 13.933 8.572 16.184 2 24.494 2H35.98l-4.215 34.906z"/><path fill="#EBA352" d="M25.75 3.484c-8.31 0-10.13 6.569-11.017 11.897-1.419 8.524-1.646 15.328 1.082 22.218 2.968 7.498 6.096 7.717 6.096 22.542 0 .742.392 1.23.793 1.557-1.407-.467-2.186-1.289-2.186-2.492 0-11.085-3.101-13.804-6.144-20.46C11.288 32 11.627 22.425 13.046 13.9 13.933 8.572 16.184 2 24.494 2H35.98v1.483H25.75z"/><g><path fill="#FFDD67" d="M45.998 28.184H31.765c-4.965 0-4.965 8.723 0 8.723h14.233c4.965-.001 4.965-8.723 0-8.723z"/><path fill="#EBA352" d="M47.103 29.633H32.871c-3.351 0-4.432 3.965-3.26 6.549-2.654-2.08-1.944-7.998 2.148-7.998h14.232c1.614 0 2.694.927 3.259 2.173-.565-.447-1.275-.724-2.147-.724z"/><path fill="#FFDD67" d="M47.532 19.427H30.454c-5.957 0-5.957 8.722 0 8.722h17.079c5.956-.001 5.956-8.722-.001-8.722z"/><path fill="#EBA352" d="M48.857 20.875H31.78c-4.021 0-5.317 3.967-3.91 6.548-3.187-2.08-2.334-7.996 2.576-7.996h17.078c1.938 0 3.234.927 3.911 2.171-.678-.444-1.532-.723-2.578-.723z"/><g><path fill="#FFDD67" d="M45.931 10.705H31.494c-5.035 0-5.035 8.722 0 8.722h14.437c5.036 0 5.036-8.722 0-8.722z"/><path fill="#EBA352" d="M47.051 12.153H32.615c-3.398 0-4.492 3.968-3.307 6.551-2.692-2.082-1.972-7.999 2.18-7.999h14.438c1.636 0 2.731.929 3.306 2.174-.575-.446-1.295-.726-2.181-.726z"/></g><g><path fill="#FFDD67" d="M44.381 2h-9.329c-5.385 0-5.385 8.721 0 8.721h9.329c5.388 0 5.388-8.721 0-8.721z"/><path fill="#EBA352" d="M45.58 3.448h-9.333c-3.631 0-4.804 3.968-3.532 6.551C29.834 7.917 30.606 2 35.045 2h9.329c1.75 0 2.923.928 3.535 2.172-.613-.443-1.381-.724-2.329-.724z"/></g></g></svg>',

  'mahjong': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="#B69467" d="M64.001 30.793v-8.402h-5.746v2.975l-17.897-14.39c-.947-.762-2.482-.762-3.43 0L5.745 36.05v-2.843H0V41.689h.025c.057.426.278.841.685 1.168l22.932 18.439c.947.762 2.482.762 3.429 0l36.22-29.125c.447-.36.677-.826.699-1.299H64l.001-.079z"/><path fill="#EFDEC2" d="M27.071 53.023c-.947.762-2.482.762-3.429 0L.71 34.585c-.947-.761-.947-1.996 0-2.757L36.929 2.704c.947-.76 2.482-.76 3.43 0l22.933 18.439c.945.762.945 1.995 0 2.756L27.071 53.023z"/><path fill-rule="evenodd" clip-rule="evenodd" fill="#B70000" d="M46.541 13.479c.823 2.12.275 4.201.264 6.297-1.772 2.118-3.725-.001-5.48 2.548 3.83 1.971 9.125 6.42 6.587 10.511-4.122-.582-8.261-1.594-12.269.566 0-1.2-1.976-2.449-3.507-3.688-6.467 2.126-9.514 10.247-16.29 11.238.263-4.635 11.336-8.978 13.399-13.564-1.573-1.96-3.028-1.139-4.588-2.82 4.193-3.629-3.083-7.569 3.444-11.138 2.126 1.556.076 2.998 1.307 4.529 2.482 1.458 4.922 1.886 7.404 3.346 3.808-2.593 3.157-5.305 5.254-7.944 1.477-.302 3.008.665 4.475.119zm-8.497 10.552l-4.865 3.912c3.634 2.25 7.142 1.529 10.609-.162-.257-2.205-3.845-3.059-5.744-3.75zm-7.982-3.811c-.884 1.923-2.262 3.833.804 5.861 1.455-1.457 4.847-2.862 3.167-4.405-1.293.253-2.643-.868-3.971-1.456z"/></svg>',

  'next': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle fill="#4FD1D9" cx="32" cy="32" r="29.999"/><path fill="#FFF" d="M25 11.989L45 32 25 52.012z"/></svg>',

  'prev': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle fill="#4FD1D9" cx="32" cy="32" r="30"/><path fill="#FFF" d="M38 12L18 32l20 20z"/></svg>',

  'rare': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle fill="#FFDD67" cx="31.996" cy="32" r="30"/><circle fill="#664E27" cx="31.996" cy="45.138" r="7"/><circle fill="#664E27" cx="20.244" cy="25.044" r="4.5"/><circle fill="#664E27" cx="42.746" cy="25.044" r="4.5"/></svg>',

  'up': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="#FFDD67" d="M31.765 27.094s-4.354.869-.753-6.613c2.608-5.418 2.348-11.709 0-15.049-3.757-5.344-11.068-3.592-10.31-.523 2.607 10.546-3.284 13.688-6.328 20.345-3.086 6.746-2.748 16.321-1.329 24.847C13.932 55.429 16.183 62 24.494 62H35.98l-4.215-34.906z"/><path fill="#EBA352" d="M25.75 60.517c-8.31 0-10.131-6.569-11.018-11.897-1.419-8.524-1.646-15.328 1.082-22.219 2.969-7.497 6.097-7.717 6.097-22.542 0-.742.392-1.231.793-1.558-1.407.468-2.186 1.289-2.186 2.492 0 11.087-3.101 13.805-6.145 20.461-3.085 6.746-2.747 16.321-1.328 24.847C13.932 55.429 16.183 62 24.494 62H35.98v-1.483H25.75z"/><g><path fill="#FFDD67" d="M45.998 35.816H31.765c-4.965 0-4.965-8.722 0-8.722h14.233c4.965 0 4.965 8.722 0 8.722z"/><path fill="#EBA352" d="M47.103 34.367H32.871c-3.351 0-4.432-3.965-3.26-6.548-2.654 2.08-1.944 7.998 2.148 7.998h14.232c1.614 0 2.694-.927 3.259-2.173-.565.446-1.275.723-2.147.723z"/><path fill="#FFDD67" d="M47.532 44.573H30.454c-5.957 0-5.957-8.722 0-8.722h17.079c5.956.001 5.956 8.722-.001 8.722z"/><path fill="#EBA352" d="M48.857 43.125H31.78c-4.021 0-5.317-3.967-3.91-6.548-3.187 2.08-2.334 7.996 2.576 7.996h17.078c1.938 0 3.234-.927 3.911-2.171-.678.444-1.532.723-2.578.723z"/><g><path fill="#FFDD67" d="M45.931 53.296H31.494c-5.035 0-5.035-8.723 0-8.723h14.437c5.036 0 5.036 8.723 0 8.723z"/><path fill="#EBA352" d="M47.051 51.848H32.615c-3.398 0-4.492-3.968-3.307-6.551-2.692 2.082-1.972 7.999 2.18 7.999h14.438c1.636 0 2.731-.929 3.306-2.174-.575.445-1.295.726-2.181.726z"/></g><g><path fill="#FFDD67" d="M44.381 62h-9.329c-5.385 0-5.385-8.721 0-8.721h9.329c5.388 0 5.388 8.721 0 8.721z"/><path fill="#EBA352" d="M45.58 60.553h-9.333c-3.631 0-4.804-3.968-3.532-6.551C29.834 56.084 30.606 62 35.045 62h9.329c1.75 0 2.923-.928 3.535-2.172-.613.443-1.381.725-2.329.725z"/></g></g></svg>',

  'write': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="#FFCE31" d="M7.913 41.135L39.825 9.232l14.951 14.956-31.911 31.903z"/><path fill="#ED4C5C" d="M61.297 4.607l-1.901-1.903c-3.606-3.603-9.444-3.602-13.052 0l-6.52 6.526 14.95 14.951 6.522-6.523c3.606-3.603 3.603-9.445.001-13.051z"/><path fill="#93A2AA" d="M35.743 13.308l4.08-4.08 14.95 14.95-4.08 4.08z"/><path fill="#C7D3D8" d="M37.342 14.907l4.08-4.08 11.753 11.752-4.08 4.08z"/><path fill="#FED0AC" d="M7.913 41.135L1.437 58.089l4.458 4.484 16.971-6.484z"/><path fill="#333" d="M.297 61.051c-.895 2.355.299 3.546 2.651 2.646l8.229-3.141-7.729-7.733-3.151 8.228z"/><path fill="#FFDF85" d="M35.744 13.31l4.984 4.983L12.9 46.121l-4.984-4.984z"/><path fill="#FF8736" d="M45.711 23.277l4.984 4.983-27.828 27.828-4.984-4.983z"/></svg>',

  'yman': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle fill="#FFDD67" cx="32" cy="32" r="30"/><circle fill="#FFF" cx="19.5" cy="24.785" r="10"/><circle fill="#664E27" cx="19.5" cy="24.785" r="3.5"/><circle fill="#FFF" cx="44.5" cy="24.785" r="10"/><circle fill="#664E27" cx="44.5" cy="24.785" r="3.5"/><g><path fill="#664E27" d="M47.676 44c-1.715-3.593-5.881-6-15.676-6-9.793 0-13.959 2.407-15.674 6-.918 1.92.393 5 .393 5 1.637 3.883 1.408 5 15.283 5 13.857 0 13.643-1.117 15.279-5 0 0 1.309-3.08.395-5z"/><path fill="#FFF" d="M43.363 42.965a.792.792 0 0 0-.217-.797S40.601 40 32 40s-11.146 2.168-11.146 2.168a.792.792 0 0 0-.217.797l.195.563c.09.26.389.473.664.473h21.008a.754.754 0 0 0 .664-.473l.195-.563z"/></g><g fill="#917524"><path d="M50.203 13.455a14.232 14.232 0 0 0-11.693-3.133c-.578.113-1.088-2.021-.385-2.156a16.42 16.42 0 0 1 13.492 3.615c.541.469-.971 2.061-1.414 1.674zM25.488 10.172c-4.168-.748-8.455.4-11.693 3.133-.443.389-1.953-1.205-1.412-1.674a16.422 16.422 0 0 1 13.492-3.615c.703.134.191 2.269-.387 2.156z"/></g></svg>',

  'newtab': '<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M38 38h-28v-28h14v-4h-14c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4v-14h-4v14zm-10-32v4h7.17l-19.66 19.66 2.83 2.83 19.66-19.66v7.17h4v-14h-14z"/></svg>',

  'previous': '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M22.8,29c-0.3,0-0.5-0.1-0.7-0.3l-8-8c-0.4-0.4-0.4-1,0-1.4l8-8c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4L16.2,20l7.3,7.3c0.4,0.4,0.4,1,0,1.4C23.3,28.9,23,29,22.8,29z"/><path d="M20,40C9,40,0,31,0,20S9,0,20,0c4.5,0,8.7,1.5,12.3,4.2c0.4,0.3,0.5,1,0.2,1.4c-0.3,0.4-1,0.5-1.4,0.2C27.9,3.3,24,2,20,2C10.1,2,2,10.1,2,20s8.1,18,18,18s18-8.1,18-18c0-3.2-0.9-6.4-2.5-9.2c-0.3-0.5-0.1-1.1,0.3-1.4c0.5-0.3,1.1-0.1,1.4,0.3C39,12.9,40,16.4,40,20C40,31,31,40,20,40z"/></svg>',

  'reload': '<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M20,40C9,40,0,31,0,20S9,0,20,0c4.5,0,8.7,1.5,12.3,4.2c0.4,0.3,0.5,1,0.2,1.4c-0.3,0.4-1,0.5-1.4,0.2C27.9,3.3,24,2,20,2C10.1,2,2,10.1,2,20s8.1,18,18,18s18-8.1,18-18c0-3.2-0.9-6.4-2.5-9.2c-0.3-0.5-0.1-1.1,0.3-1.4c0.5-0.3,1.1-0.1,1.4,0.3C39,12.9,40,16.4,40,20C40,31,31,40,20,40z"/><path d="M30.5,20c0,0.6-0.4,1-1,1c-0.5,0-1-0.4-1-1c0-4.7-3.8-8.6-8.5-8.6c-4.7,0-8.5,3.8-8.5,8.6c0,4.7,3.8,8.6,8.5,8.6l-1.7-1.7c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l3.1,3.1l0.2,0.1l0.2,0.2c0.2,0.2,0.3,0.4,0.3,0.7c0,0.3-0.1,0.5-0.3,0.7l-3.4,3.4C19.5,33.9,19.2,34,19,34s-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.7-1.7c-5.8,0-10.5-4.7-10.5-10.6S14.2,9.4,20,9.4S30.5,14.2,30.5,20z"/></svg>',

  'logout': '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path transform="translate(-393, -407)" d="M396,408 L396,430 L411,430 L411,424 L409,424 L409,428 L398,428 L398,410 L409,410 L409,414 L411,414 L411,408 L396,408 Z M411,415 L413,414 L418,419 L413,423 L411,422 L414,420 L403,420 L403,418 L414,418 L411,415 Z" fill="#fff"/></svg>',

  'view': '<svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1664 960q-152-236-381-353 61 104 61 225 0 185-131.5 316.5t-316.5 131.5-316.5-131.5-131.5-316.5q0-121 61-225-229 117-381 353 133 205 333.5 326.5t434.5 121.5 434.5-121.5 333.5-326.5zm-720-384q0-20-14-34t-34-14q-125 0-214.5 89.5t-89.5 214.5q0 20 14 34t34 14 34-14 14-34q0-86 61-147t147-61q20 0 34-14t14-34zm848 384q0 34-20 69-140 230-376.5 368.5t-499.5 138.5-499.5-139-376.5-368q-20-35-20-69t20-69q140-229 376.5-368t499.5-139 499.5 139 376.5 368q20 35 20 69z"/></svg>',

  'arrow_rotate': '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M1,2.053h3h7.455H19v0.025c6.117,0.264,11,5.292,11,11.475  c0,6.182-4.883,11.211-11,11.475v0.025h-7.545H4H3.362l3.294-3.294c0.389-0.389,0.389-1.025,0-1.414s-1.025-0.389-1.414,0  l-4.95,4.95c-0.201,0.201-0.293,0.467-0.287,0.732c-0.007,0.265,0.086,0.531,0.287,0.732l4.95,4.95c0.389,0.389,1.025,0.389,1.414,0  s0.389-1.025,0-1.414l-3.242-3.241H19c0.059,0,0.109-0.024,0.165-0.034C26.31,26.67,32,20.784,32,13.553  c0-7.456-6.044-13.5-13.5-13.5c-0.135,0-0.266,0.016-0.401,0.02c-0.034-0.004-0.064-0.02-0.099-0.02H1c-0.55,0-1,0.45-1,1  C0,1.603,0.45,2.053,1,2.053z"/></svg>'
};

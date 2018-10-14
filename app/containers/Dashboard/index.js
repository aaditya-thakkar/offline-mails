import React from 'react';

import { Helmet } from 'react-helmet';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  render() {
    return (
      <article>
        <Helmet>
          <title>Offline Mails Grabber</title>
        </Helmet>
        <div className="titleText">OFFLINE MAILS</div>
        <div className="card">
          <svg height="100pt" viewBox="0 0 512 512.00078" width="512pt" style={{ marginBottom: '50px' }} xmlns="http://www.w3.org/2000/svg"><path d="m511.945312 185.265625v277.585937c0 14.238282-6.058593 27.058594-15.734374 36.035157-8.777344 8.136719-20.519532 13.109375-33.421876 13.109375h-413.640624c-12.902344 0-24.644532-4.972656-33.410157-13.101563-9.675781-8.984375-15.73437475-21.804687-15.73437475-36.042969v-277.585937zm0 0" fill="#fec970"/><path d="m511.941406 185.265625-196.777344-163.847656c-34.296874-28.558594-84.089843-28.558594-118.386718 0l-196.777344 163.847656h.00390625l57.99609375 48.289063 138.777344 115.550781c34.300781 28.566406 84.09375 28.566406 118.382812 0l138.789063-115.550781 57.996093-48.289063" fill="#fba028"/><path d="m453.949219 83.011719v150.542969l-138.789063 115.550781c-34.289062 28.566406-84.082031 28.566406-118.382812 0l-138.777344-115.550781v-150.542969c0-31.386719 25.449219-56.835938 56.84375-56.835938h282.269531c31.394531 0 56.835938 25.449219 56.835938 56.835938zm0 0" fill="#30a1f2"/><path d="m453.949219 83.011719v116.0625l-138.789063 115.554687c-34.289062 28.5625-84.082031 28.5625-118.382812 0l-138.777344-115.554687v-116.0625c0-31.386719 25.449219-56.835938 56.84375-56.835938h282.269531c31.394531 0 56.835938 25.449219 56.835938 56.835938zm0 0" fill="#e4f5f7"/><g fill="#4b5051"><path d="m370.898438 224.902344h-229.847657c-4.328125 0-7.835937-3.507813-7.835937-7.835938 0-4.324218 3.507812-7.835937 7.835937-7.835937h229.847657c4.328124 0 7.835937 3.511719 7.835937 7.835937 0 4.328125-3.507813 7.835938-7.835937 7.835938zm0 0"/><path d="m370.898438 270.414062h-229.847657c-4.328125 0-7.835937-3.507812-7.835937-7.835937s3.507812-7.835937 7.835937-7.835937h229.847657c4.328124 0 7.835937 3.507812 7.835937 7.835937s-3.507813 7.835937-7.835937 7.835937zm0 0"/><path d="m370.898438 133.886719h-229.847657c-4.328125 0-7.835937-3.507813-7.835937-7.835938s3.507812-7.835937 7.835937-7.835937h229.847657c4.328124 0 7.835937 3.507812 7.835937 7.835937s-3.507813 7.835938-7.835937 7.835938zm0 0"/><path d="m370.898438 179.394531h-229.847657c-4.328125 0-7.835937-3.507812-7.835937-7.835937s3.507812-7.835938 7.835937-7.835938h229.847657c4.328124 0 7.835937 3.507813 7.835937 7.835938s-3.507813 7.835937-7.835937 7.835937zm0 0"/></g><path d="m501.496094 109.703125c0 60.300781-48.882813 109.183594-109.179688 109.183594-60.300781 0-109.183594-48.882813-109.183594-109.183594 0-60.296875 48.882813-109.179687 109.183594-109.179687 60.296875 0 109.179688 48.882812 109.179688 109.179687zm0 0" fill="#30a1f2"/><path d="m501.496094 109.703125c0 57.140625-43.878906 104.019531-99.773438 108.785156-55.90625-4.765625-99.777344-51.644531-99.777344-108.785156 0-57.128906 43.871094-104.007813 99.777344-108.769531 55.894532 4.761718 99.773438 51.640625 99.773438 108.769531zm0 0" fill="#30a1f2"/><path d="m391.792969 176.875c-2.292969 0-4.496094-1.011719-5.996094-2.796875l-45.441406-54.113281c-2.78125-3.316406-2.351563-8.257813.960937-11.039063 3.316406-2.785156 8.257813-2.351562 11.039063.960938l37.253906 44.363281 42-98c1.703125-3.976562 6.3125-5.820312 10.289063-4.113281 3.976562 1.703125 5.820312 6.308593 4.113281 10.289062l-47.015625 109.699219c-1.070313 2.503906-3.363282 4.269531-6.054688 4.664062-.382812.058594-.765625.085938-1.148437.085938zm0 0" fill="#fff"/><path d="m464.226562 480.101562c-1.765624 0-3.542968-.59375-5.007812-1.8125l-124.949219-104.03125c-3.324219-2.769531-3.773437-7.710937-1.007812-11.035156 2.769531-3.324218 7.710937-3.777344 11.035156-1.007812l124.945313 104.027344c3.328124 2.769531 3.78125 7.707031 1.011718 11.035156-1.550781 1.863281-3.78125 2.824218-6.027344 2.824218zm0 0" fill="#fba028"/><path d="m177.429688 374.464844-102.683594 87.707031c-14.144532 12.085937-7.820313 35.183594 10.511718 38.371094 29.488282 5.125 63.945313 10.875 73.210938 11.457031h-109.316406c-12.90625 0-24.648438-4.972656-33.414063-13.101562-9.675781-8.984376-15.73437475-21.804688-15.73437475-36.042969v-277.589844h37.10156275v189.222656c.355469 38.25 45.195312 58.777344 74.597656 34.308594l55.945313-46.585937c3.386718-2.808594 8.453124-2.296876 11.191406 1.203124 2.644531 3.371094 1.878906 8.3125-1.410156 11.050782zm0 0" fill="#fba028"/></svg>
          <span className="infoText">Your phone number has been verified for use with your account offline!</span>
        </div>
      </article>
    );
  }
}

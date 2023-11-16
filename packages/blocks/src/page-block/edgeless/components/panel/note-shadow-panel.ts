import '../buttons/tool-icon-button.js';

import { WithDisposable } from '@blocksuite/lit';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';

import {
  NoteNoShadowIcon,
  NoteShadowSampleIcon,
} from '../../../../_common/icons/edgeless.js';
import { NOTE_SHADOWS } from '../../../../note-block/index.js';

const TOOLBAR_SHADOWS = [
  '',
  '0px 0.2px 4.8px 0px rgba(66, 65, 73, 0.2), 0px 0px 1.6px 0px rgba(66, 65, 73, 0.2)',
  '0px 9.6px 10.4px -4px rgba(66, 65, 73, 0.07), 0px 10.4px 7.2px -8px rgba(66, 65, 73, 0.22)',
  '0px 1.2px 2.4px 4.8px rgba(66, 65, 73, 0.16), 0px 0px 0px 4px rgba(255, 255, 255, 1)',
  '0px 5.2px 12px 0px rgba(66, 65, 73, 0.13), 0px 0px 0.4px 1px rgba(0, 0, 0, 0.06)',
  '0px 0px 0px 1.4px rgba(0, 0, 0, 1), 2.4px 2.4px 0px 1px rgba(0, 0, 0, 1)',
];

const TOOTIPS = [
  'No Shadow',
  'Box Shadow',
  'Sticker Shadow',
  'Paper Shadow',
  'Floation Shadow',
  'Film Shadow',
];

@customElement('edgeless-note-shadow-panel')
export class EdgelessNoteShadowPanel extends WithDisposable(LitElement) {
  static override styles = css`
    :host {
      width: 506.5px;
      height: 104px;
      border-radius: 8px;
      padding: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--affine-background-overlay-panel-color);
      gap: 8px;
      box-shadow: var(--affine-shadow-2);
    }

    .item {
      width: 75.08px;
      height: 88px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
      cursor: pointer;
    }

    .item-icon {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .item:hover {
      background-color: var(--affine-hover-color);
    }
  `;

  @property({ attribute: false })
  value!: string;

  @property({ attribute: false })
  background!: string;

  @property({ attribute: false })
  onSelect!: (value: string) => void;

  override render() {
    return html`${repeat(
      NOTE_SHADOWS,
      shadow => shadow,
      (shadow, index) => {
        return html`
          <style>
            .item-icon svg rect:first-of-type {
              fill: var(${this.background});
            }
          </style>
          <div
            class="item"
            @click=${() => this.onSelect(shadow)}
            style=${styleMap({
              border:
                this.value === shadow
                  ? '1px solid var(--affine-brand-color)'
                  : 'none',
            })}
          >
            <edgeless-tool-icon-button
              class="item-icon"
              .tooltip=${TOOTIPS[index]}
              .tipPosition=${'bottom'}
              .iconContainerPadding=${0}
              style=${styleMap({
                boxShadow: `${TOOLBAR_SHADOWS[index]}`,
              })}
            >
              ${index === 0 ? NoteNoShadowIcon : NoteShadowSampleIcon}
            </edgeless-tool-icon-button>
          </div>
        `;
      }
    )} `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'edgeless-note-shadow-panel': EdgelessNoteShadowPanel;
  }
}

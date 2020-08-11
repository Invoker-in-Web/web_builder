<template>
  <div
    class="main-panel-tree bg-dark q-pa-sm q-mr-sm"
    :class="{'slide-left' : !isOpened}"
    @dragenter.capture="onDragEnter"
    @dragleave.capture="onDragLeave"
    @dragover.capture="onDragOver"
    @drop.capture="onDrop"
  >
    <DraggableTree
      @drag="setIsReordering(true)"
      @drop="setIsReordering(false)"
      :data="this.getElements"
      draggable
      cross-tree
    >
      <div
        slot-scope="{data, store}"
        class="tree-item"
      >
        <template v-if="!data.isDragPlaceHolder">
          <span class="item-toggler">
            <b
              v-if="data.children && data.children.length"
              :class="[data.open ? 'down' : 'right']"
              class="arrow"
              @click="store.toggleOpen(data)"
            ></b>
          </span>
          <span
            :style="{
              borderColor: data.color,
              backgroundColor: data === activeElement ? data.color : ''
            }"
            class="item-label row justify-between items-center"
            :data-id="data.id"
            @click="setActive"
          >
            <div class="item-label--title">
              <span>{{data.label}}</span>
              <q-icon
                v-if="hasUnfilledProps(data)"
                name="warning"
                class="q-mx-sm"
                size="1em"
                color="orange-5"
              >
                <q-tooltip
                  :target="true"
                  anchor="center middle"
                  self="center middle"
                  content-class="bg-black"
                  content-style="font-size: .9em"
                >
                  This component has required props:
                  <span class="text-yellow-5">
                    {{`${Object.keys(data.requiredProps).map(key => ' ' + key)}`}}
                  </span>
                </q-tooltip>
              </q-icon>
            </div>
            <q-icon
              name="delete"
              class="item-label--delete"
              size="1.3em"
              @click.stop="deleteNode({
                id: data.id,
                findObjectById
              })"
            />
          </span>
        </template>
      </div>
    </DraggableTree>
  </div>
</template>

<script>
import { DraggableTree } from 'vue-draggable-nested-tree';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Tree',
  components: {
    DraggableTree,
  },
  props: ['isOpened'],
  data() {
    return {
      previouslySelected: null,
    };
  },
  computed: {
    ...mapState('tree', [
      'activeElement',
      'isReordering',
      'treeNodes',
    ]),
    getElements() {
      return this.treeNodes;
    },
  },
  methods: {
    ...mapActions({
      setActiveItem: 'tree/setActiveItem',
      setIsReordering: 'tree/setIsReordering',
      deleteNode: 'tree/deleteNode',
    }),
    onDragEnter(e) {
      e.preventDefault();

      if (e.target.classList.contains('item-label')) {
        e.target.classList.add('dragover');
      }
    },
    onDragLeave(e) {
      if (e.target.classList.contains('item-label')) {
        e.target.classList.remove('dragover');
      }
    },
    onDragOver(e) {
      e.preventDefault();
    },
    onDrop(e) {
      e.preventDefault();

      this.$store.dispatch('tree/dropItem', {
        event: e,
        findObjectById: this.findObjectById,
      });

      if (e.target.classList.contains('item-label')) {
        e.target.classList.remove('dragover');
      }
    },
    setActive(e) {
      e.target.style.backgroundColor = e.target.style.borderColor;

      if (this.previouslySelected) {
        if (e.target === this.previouslySelected) return;
        this.previouslySelected.style.backgroundColor = 'transparent';
      }

      this.setActiveItem({
        event: e,
        findObjectById: this.findObjectById,
      });

      this.previouslySelected = e.target;
    },
    findObjectById(data, id) {
      let result = null;

      // Если на данном уровне есть нужный id, возвращаем объект
      result = data.find(el => el.id === id);
      if (result) return { parent: data, result };

      // Вызываем функцию у объекта с другими вложенными объектами
      const nestingObject = data.filter(el => el.children);
      if (nestingObject.length) {
        nestingObject.forEach(el => {
          const foundObject = this.findObjectById(el.children, id);
          if (foundObject) result = foundObject;
        });
      }

      return result;
    },
    hasUnfilledProps(data) {
      return Object.values(data.requiredProps).some(propValue => propValue === false);
    },
  },
};
</script>

<style lang="scss">
  .main-panel-tree {
    width: 320px;
    overflow-y: auto;
    max-height: calc(100vh - 88px);
    transition: all .2s;
  }
  .main-panel-tree::-webkit-scrollbar {
    width: 5px;
    height: 8px;
  }
  .main-panel-tree::-webkit-scrollbar-thumb {
    background: $grey-9;
    border-radius: 4px;
  }
  .main-panel-tree::-webkit-scrollbar-corner {
    display: none;
  }
  .main-panel-tree .tree-item .item-label--delete {
    display: none;
  }
  .main-panel-tree .tree-item:hover .item-label--delete {
    display: inline;
    color: #fff;
  }
  .main-panel-tree .tree-item .item-label--delete:hover {
    color: $red-5;
  }
  .tree-item {
    display: flex;
    cursor: pointer;
  }
  .tree-item .item-toggler {
    width: 24px;
    height: 100%;
  }
  .tree-item .item-label {
    width: 100%;
    border: 1px solid $grey;
    border-left-width: 3px;
    border-radius: 4px;
    padding: 2px 6px;
  }
  .tree-item .item-label:hover {
    background-color: rgba(128, 128, 128, 0.1);
  }
  .tree-item .item-label.dragover {
    box-shadow: 0 5px 0 rgba(0, 0, 255, .3);
    border-bottom: transparent;
  }
  .arrow {
    border: solid $grey;
    border-width: 0 3px 3px 0;
    display: inline-block;
    margin: 7px;
    padding: 3px;
    height: 3px;
    transition: all .2s;
  }
  .arrow.down {
    transform: rotate(45deg);
  }
  .arrow.right {
    transform: rotate(-45deg);
  }
  .slide-left {
    width: 0;
    margin: 0 !important;
    padding: 0 !important;
  }
  .slide-left::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
</style>

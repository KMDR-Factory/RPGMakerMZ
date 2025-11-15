//=============================================================================
// KMDR_DisplayName.js 表示名設定プラグイン
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc 「名前」とは別にゲーム内での表示名を設定するプラグイン
 * @author こまどり乳酸菌
 * 
 * @help
 * KMDR_DisplayName.js
 * 
 * エディタ上で表示される「名前」とは別に、ゲーム上で表示される表示名を設定できます。
 * エディタ上の名前とゲーム上の名前を分けたいアイテムのメモ欄に、以下のメタデータを記述してください。
 * 
 * <displayName:xx>
 * このメタデータが付与されたスキルおよびアイテムは、
 * ゲーム上の表示名がxxになる。元々設定されていた名前は使われない。
 * 
 * 
 * 注意：
 * ・「イベントの簡単作成」で作った宝箱の場合、エディタ上の名前が埋め込まれるため
 * 　アイテムの表示名は反映されません。メタデータを付与したアイテムを入れる場合手動で修正してください。
 * 
 * 利用規約：
 * このプラグインはMITライセンスで配布されます。
 * ご自由にお使いください。
 * https://opensource.org/licenses/mit-license.php

 */
"use strict";
(()=>{
    const pluginName = 'KMDR_DisplayName';
    const parameters = PluginManager.parameters(pluginName);

    // 新規メソッド
    DataManager.setDisplayName = function(data) {
        for (const elem of data) {
            if (elem) {
                elem.originalName = elem.name;
                if (elem.meta && elem.meta.displayName) {
                    elem.name = elem.meta.displayName;
                }
            }
        }
    }

    // 改変メソッド
    // rmmz_managers.js
    const _DataManager_onLoad = DataManager.onLoad;
    DataManager.onLoad = function(object) {
        _DataManager_onLoad.call(this, ...arguments);
        if (Array.isArray(object)) {
            this.setDisplayName(object);    
        }
    };

})();
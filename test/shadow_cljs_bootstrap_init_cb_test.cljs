(ns shadow-cljs-bootstrap-init-cb-test
  (:require
    [cljs.test :refer-macros [is deftest async use-fixtures]]
    [cljs.analyzer :as analyzer]
    [cljs.js :as cljs]
    [cljs.env :as env]
    [cljs.source-map :as source-map]
    [cljs.tagged-literals :as tagged-literals]
    [cljs.tools.reader :as reader]
    [cljs.tools.reader.reader-types :as reader-types]
    [shadow.cljs.bootstrap.browser :as bootstrap]))

(deftest race-condition
  (async done
    (bootstrap/init (cljs/empty-state)
                    {:path "/bootstrap"}
                    (fn []
                        (is (object? js/window.cljs.user))
                        (done)))))
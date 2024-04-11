module Constants
  ITEMS_PER_PAGE = 6

  PERSPECTIVE_MAPPING = {
    変更: :modify,
    代用: :substitute,
    逆転: :reverse,
    結合: :combine,
    拡大: :magnify,
    縮小: :minify
  }
end

Constants.freeze
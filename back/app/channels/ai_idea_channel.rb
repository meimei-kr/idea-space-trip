class AiIdeaChannel < ApplicationCable::Channel
  def subscribed
    stream_from "ai_idea_channel_#{params[:user_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
